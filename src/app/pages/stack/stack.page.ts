import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Storage } from '@ionic/storage';
import { ToastController, PopoverController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PopoverComponent } from './../../popover/popover.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../../assets/dataUrl/url';
// const url = 'http://192.168.15.245:3000/';
// const url = 'http://192.168.2.2:3000/';


@Component({
  selector: 'app-stack',
  templateUrl: './stack.page.html',
  styleUrls: ['./stack.page.scss'],
})
export class StackPage implements OnInit {

  @ViewChild('input') myInput;

  HN_key;
  stack_req: any;
  station;
  data_scan;
  position;
  fullname;
  u_id: any;
  constructor(
    private socket: Socket,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient,
    private popoverController: PopoverController,
    private toastController: ToastController,
    private alert: AlertController,
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

  async presentToast_Stack_empty() {
    const toast = await this.toastController.create({
      message: 'ไม่พบข้อมูล',
      duration: 5000
    });
    toast.present();
  }

  async presentToast_Stack_pay() {
    const toast = await this.toastController.create({
      message: 'จ่ายยา',
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

  async presentToast_Scan_data(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }


  ngOnInit() {

    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);

    this.storage.get('Station').then((val) => {
      this.station = val;
      console.log(this.station);

    })

    this.storage.get('position').then((val) => {
      this.position = val;

    })

    this.storage.get('fullname').then((val) => {
      this.fullname = val;

    })

    this.storage.get('u_id').then((val) => {
      this.u_id = val;
    })

    this.storage.get('Station').then((val) => {
      this.station = val;
      console.log(this.station);

      this.http.get(url + 'api/stack' + this.station).subscribe((message) => {
        console.log(message);
        if (message["msg"] === "empty") {
          this.presentToast_Stack_empty();
          this.stack_req = null;
        } else {
          this.stack_req = message;
        }
      })
    })

  }

  call_stack() {
    let hn = this.HN_key.toString();
    console.log(hn);
    this.storage.get('Station').then((val) => {
      this.station = val;
      this.socket.emit('call_stack_s' + this.station, this.HN_key);

      this.socket.fromEvent('stack_result_s' + this.station).subscribe(message => {
        // console.log(message);
        if (message === "empty stack data") {
          this.presentToast_Stack_empty();

        } else {
          this.stack_req = message;
          console.log(this.stack_req);
        }
      })
    })
  }

  scan_call_stack() {
    this.storage.get('Station').then((val) => {
      this.station = val;
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.data_scan = barcodeData;
        let str = this.data_scan["text"];
        let res = str.slice(27, 35);
        console.log(res);

        this.presentToast_Scan_data(res);
        this.socket.emit('call_stack_s' + this.station, res);
        this.socket.fromEvent('stack_result_s' + this.station).subscribe(message => {
          console.log(message);
          if (message === "empty stack data") {
            this.presentToast_Stack_empty();
          } else {
            this.stack_req = message;
            console.log(this.stack_req);

          }
        })

      }).catch(err => {
        console.log('Error', err);
        this.presentToast_Scan_err();
      });
    })
  }

  async presentAlertConfirm(item) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'ตำแหน่ง ' + item.stack_name + ' - ' + item.stackrow + ' - ' + item.stackcol,
      message: 'ต้องการจ่ายยาจากตำแหน่งนี้หรือไม่',
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
            this._pay$(item.hn);
          }
        }
      ]
    });

    await alert.present();
  }


  _pay$(item) {
    this.storage.get('Station').then((val) => {
      this.station = val;
      console.log(this.station);

      let result = this.stack_req.find(fruit => fruit.hn === item);
      console.log(result);

      let data = {
        u_id: this.u_id,
        hn: result.hn,
        order_number: result.order_number
      }
      this.socket.emit('pay_stack_s' + this.station, data);
    })
    this.presentToast_Stack_pay();
    this.ngOnInit();

  }

  reset() {
    this.stack_req = null;
  }
  doRefresh(event) {
    console.log(event);
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  refresh() {
    this.ngOnInit();
  }
}





