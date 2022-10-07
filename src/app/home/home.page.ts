import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../popover/popover.component';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Socket } from 'ngx-socket-io';
import { ApiService } from '../api.service';

import { Router } from '@angular/router';

import jwt_decode from "jwt-decode";

import jwtDecode, { JwtPayload } from "jwt-decode";

import { LoadingController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../assets/dataUrl/url';
// const url = 'http://192.168.15.245:3000/';
// const url = 'http://192.168.2.2:3000/';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild('input') myInput ;

  list_number: any;
  number_call = [];
  obj_number: string;
  isCalled = [];

  payload_s1: string;
  messages = [];
  StatusEvent: boolean;


  send_pay_queue = [];
  message: string;

  station: any;
  token: any;
  fullname: any;
  position: any;
  u_id: any;

  data_scan: any;

  stackcol: any;
  stackrow: any;
  stackname: any;

  data = [];

  public connectionStatus: string;

  constructor(
    private router: Router,
    private ApiService: ApiService,
    private socket: Socket,
    private popoverController: PopoverController,
    private storage: Storage,
    private toastController: ToastController,
    private alert: AlertController,
    private http: HttpClient,
    private barcodeScanner: BarcodeScanner,
    private loading: LoadingController

  ) {
    this.socket.connect();
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentToast_receivedMessages_err() {
    const toast = await this.toastController.create({
      message: 'กรูณา เช็คหมายเลขรับยา หรือ ช่องรับยา.',
      duration: 5000
    });
    toast.present();
  }

  async presentToast_Station_init() {
    const toast = await this.toastController.create({
      message: 'กรูณา เช็ค ช่องรับยา.',
      duration: 5000
    });
    toast.present();
  }

  async presentToast_Error_empty_number() {
    const toast = await this.toastController.create({
      message: 'กรูณา เช็คหมายเลขรับยา.',
      duration: 5000
    });
    toast.present();
  }
  async presentToast_Error_empty_stack_s1() {
    const toast = await this.toastController.create({
      message: 'ช่องพักตะกร้าเต็ม.',
      duration: 5000
    });
    toast.present();
  }
  async presentToast_Call_again(item) {
    const toast = await this.toastController.create({
      message: 'เรียก ' + item + ' อีกครั้ง.',
      duration: 5000
    });
    toast.present();
  }

  async presentToast_pay(item) {
    const toast = await this.toastController.create({
      message: 'จ่ายยาหมายเลข' + item + 'แล้ว',
      duration: 5000
    });
    toast.present();
  }

  async presentToast_next(item) {
    const toast = await this.toastController.create({
      message: 'พักตะกร้าหมายเลข' + item,
      duration: 5000
    });
    toast.present();
  }

  async presentToast_alert_login() {
    const toast = await this.toastController.create({
      message: 'กรุณาเข้าสู่ระบบ',
      duration: 5000
    });
    toast.present();
  }

  async presentToast_alert_limit() {
    const toast = await this.toastController.create({
      message: 'กรุณา ล้างหมายเลขรับยา',
      duration: 5000
    });
    toast.present();
  }


  async presentToast_station_cfg_close() {
    const toast = await this.toastController.create({
      message: 'station close',
      duration: 5000
    });
    toast.present();
  }
  async presentToast_station_cfg_open() {
    const toast = await this.toastController.create({
      message: 'station open',
      duration: 5000
    });
    toast.present();
  }

  async presentAlertConfirm(msg, item) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'ชั้นพักตะกร้า',
      message: msg,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Confirm Okay');
            this._next$(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast_empty() {
    const toast = await this.toastController.create({
      message: 'ไม่พบข้อมูล',
      duration: 5000
    });
    toast.present();
  }
  async presentToast_Scan_err() {
    const toast = await this.toastController.create({
      message: 'Scan Error',
      duration: 5000
    });
    toast.present();
  }

  ngOnInit() {

    setTimeout(() => {
      this.myInput.setFocus();
    },150);

  }

  ionViewWillEnter() {
    this.storage.get('Station').then((val) => {
      this.station = val;
      if (this.station === null) {
        this.presentToast_Station_init();
        this.router.navigate(['/login']);
      } else {
        this._payload$();
      }

    })

    this.storage.get('fullname').then((val) => {
      this.fullname = val;
    })

    this.storage.get('u_id').then((val) => {
      this.u_id = val;
    })

    console.log("u_id=>" + this.u_id);
    console.log("fullname=>" + this.fullname);
    console.log("station=>" + this.station);
  }


  _payload$() {
    this.storage.get('StatusEvent').then((val) => {
      this.StatusEvent = val;
      console.log(this.StatusEvent);
    });
    if (this.StatusEvent === false) {
      this.presentToast_station_cfg_close();
    } else {
      this.storage.get('Station').then((val) => {
        this.station = val;
        this.socket.fromEvent('iscall_s' + this.station).subscribe((message: any) => {
          this.message = message;
          console.log(this.message);

          if (this.message == 'empty') {
            this.presentToast_Error_empty_number();
          } else {
            this.payload_s1 = JSON.parse(this.message);
            this.isCalled.push(this.payload_s1[0]);
          }
        })
      })

    }

  }

  _even() {
    this.socket.fromEvent('iscall_s' + this.station).subscribe(message => {
      console.log(message);
    })
  }
  ngOnDestroy() {

  }
  _push_number$() {
    const list = this.list_number;
    console.log('list_number is ' + list);

    this.storage.get('StatusEvent').then((val) => {
      this.StatusEvent = val;
      console.log(this.StatusEvent);
    });
    if (this.StatusEvent === false) {
      this.presentToast_station_cfg_close();
    } else {
      this.storage.get('Station').then((val) => {
        this.station = val;
        console.log(this.station);
        if (this.data.length > 3) {
          this.presentToast_alert_limit();
        } else {
          var check = this.number_call.findIndex(function checkAge(number_call) {
            return number_call == list;
          })
          console.log('datamap is ' + check);

          if (check == -1) {
            this.http.get(url + 'api/que_s1' + list).subscribe((message) => {
              console.log(message[0]);
              if (message["msg"] === "empty") {
                this.presentToast_Error_empty_number();
              } else {
                this.data.push(message[0]);
                console.log(this.data);
              }
            })
            let list_n = {
              number_call: list,
              u_id: this.u_id
            };
            this.socket.emit('station' + this.station, list_n);
            this.number_call.push(list);
            console.log('array' + this.number_call);
            console.log('one' + list);
            this.obj_number = JSON.stringify(this.number_call);
          }


        }

      })

    }
    this.list_number = null;

  }

  _clear_number$() {
    this.number_call = [];
    this.obj_number = "";
  }

  _call$(item) {
    this.socket.emit('call_one_s' + this.station, item);
    this.presentToast_Call_again(item);
  }

  _pay$(item: any) {
    console.log(item);

    this.storage.get('Station').then((val) => {
      this.station = val;
      let result = this.isCalled.find(fruit => fruit.internal_que === item);
      console.log(result);

      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + ' ' + time;
      console.log(dateTime);

      let str = item;
      console.log(str.charAt(0));

      let obj_pay = {
        callque: item,
        calldatetime: dateTime,
        station_id: this.station,
        quetype: str.charAt(0),
        order_number: result.order_number,
        order_state: result.order_state,
        hn: result.hn,
        u_id: this.u_id
      }
      console.log(obj_pay);

      this.socket.emit('pay_by_station' + this.station, obj_pay);
      let index = this.isCalled.findIndex(obj => obj.internal_que == item);
      console.log(index);
      delete this.isCalled[index].internal_que;

      let index1 = this.data.findIndex(obj => obj.internal_que == item);
      console.log(index1);
      delete this.data[index1].internal_que;

      this.presentToast_pay(item);

    })

  }

  _next$(item) {
    console.log("item=>" + item);

    this.storage.get('Station').then((val) => {
      this.station = val;
      let result = this.isCalled.find(fruit => fruit.internal_que === item);
      console.log(result.internal_que);
      console.log(result.hn);

      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + ' ' + time;
      console.log(dateTime);

      let str = item;
      console.log(str.charAt(0));


      let obj_stack = {
        stackque: result.internal_que,
        stackdatetime: dateTime,
        quetype: str.charAt(0),
        order_number: result.order_number,
        hn: result.hn,
        stackcol: this.stackcol,
        stackrow: this.stackrow,
        stackname: this.stackname,
        rf_id: this.u_id
      }
      console.log(obj_stack);

      this.socket.emit('next_by_station' + this.station, obj_stack);

      this.socket.fromEvent('stack_null_s' + this.station).subscribe((message: any) => {
        if (message == 'empty') {
          this.presentToast_Error_empty_stack_s1();
        } else {
          let index = this.isCalled.findIndex(obj => obj.internal_que == item);
          console.log(index);
          delete this.isCalled[index].internal_que;

          let index1 = this.data.findIndex(obj => obj.internal_que == item);
          console.log(index1);
          delete this.data[index1].internal_que;

          this.presentToast_next(item);
        }
      })
    })

  }

  _call_stack(item: any) {
    let que = item;
    console.log("que" + que);
    console.log("station" + this.station);
    this.storage.get('Station').then((val) => {
      this.station = val;
      this.http.get(url + 'api/checker' + this.station).subscribe((message) => {
        console.log(message);
        if (message["msg"] === "empty") {
          this.presentToast_Error_empty_stack_s1();
        } else {
          console.log(message[0].stack_name);
          console.log(message[0].stackcol);
          console.log(message[0].stackrow);
          this.stackcol = message[0].stackcol;
          this.stackrow = message[0].stackrow;
          this.stackname = message[0].stack_name;
          var stack = message[0].stack_name + "-" + message[0].stackrow + "-" + message[0].stackcol;
          this.presentAlertConfirm(stack, que);
        }
      })

    })

  }

  _reset$() {
    this.storage.get('Station').then((val) => {
      this.station = val;
      this.socket.emit('reset_number_station' + this.station, "reset_dash1");
    })
    this.isCalled = [];
    this.number_call = [];
    this.obj_number = "";
    this.data = [];
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this._payload$();
    this._reset$();
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}


