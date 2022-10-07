import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Storage } from '@ionic/storage';
import { ToastController, PopoverController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PopoverComponent } from './../../popover/popover.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.page.html',
  styleUrls: ['./report-status.page.scss'],
})
export class ReportStatusPage implements OnInit {

  @ViewChild('input') myInput;

  HN_key;
  station;
  data_scan;
  position;
  fullname;
  report_data: any;


  constructor(
    private socket: Socket,
    private storage: Storage,
    private http: HttpClient,
    private barcodeScanner: BarcodeScanner,
    private popoverController: PopoverController,
    private toastController: ToastController
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
  }

  call_status() {
    let hn = this.HN_key.toString();
    console.log(hn);
    this.storage.get('Station').then((val) => {
      this.station = val;
      this.socket.emit('call_status_s' + this.station, this.HN_key);

      this.socket.fromEvent('status_result_s' + this.station).subscribe(message => {
        // console.log(message);
        if (message === "empty stack data") {
          this.presentToast_Stack_empty();
        } else {
          this.report_data = message;
          console.log(this.report_data);

        }
      })
    })

  }
  scan_call_status() {
    this.storage.get('Station').then((val) => {
      this.station = val;
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.data_scan = barcodeData;
        let str = this.data_scan["text"];
        let res = str.slice(27, 35);
        console.log(res);
        this.presentToast_Scan_data(res);

        this.socket.emit('call_status_s' + this.station, res);
        this.socket.fromEvent('status_result_s' + this.station).subscribe(message => {
          console.log(message);
          if (message === "empty stack data") {
            this.presentToast_Stack_empty();

          } else {
            this.report_data = message;
            console.log(this.report_data);

          }
        })

      }).catch(err => {
        console.log('Error', err);
        this.presentToast_Scan_err();
      });
    })

  }




  reset() {
    this.report_data = null;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
