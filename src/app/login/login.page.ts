import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import jwt_decode from "jwt-decode";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { url } from '../../assets/dataUrl/url';
// const url = 'http://192.168.15.245:3000/';
// const url = 'http://192.168.2.2:3000/';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('input') myInput;

  username: any;
  url: any = url;
  password: any;
  station: any = null;
  res_login: any = null;
  fullname: any = null;
  u_id: any = null;


  constructor(
    private router: Router,
    private toastController: ToastController,
    private http: HttpClient,
    private storage: Storage,
    private loading: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) { }

  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToast_result_login(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  async presentToast_station_null() {
    const toast = await this.toastController.create({
      message: 'station null',
      duration: 5000
    });
    toast.present();
  }

  async qrcodetToast_err(qrcode) {
    const qrcodetToast_err = await this.toastController.create({
      message: qrcode,
      duration: 2000
    });
    qrcodetToast_err.present();
  }

  ngOnInit() {

    setTimeout(() => {
      this.myInput.setFocus();
    }, 2000);

    this.storage.get('Station').then((val) => {
      this.station = val;
    })
    console.log("fullname=>" + this.fullname);
    console.log("station=>" + this.station);
    console.log("u_id=>" + this.u_id); 

  }

  $login() {
    if (this.station === null) {
      this.presentLoading();
      this.presentToast_station_null();
    } else {
      let data = { "username": this.username, "password": this.password };
      this.http.post<any>(url + 'api/usernamelogin', data).subscribe(res => {
        console.log(res);
        if (res["status"] === 200) {
          this.res_login = res;
          this.router.navigate(['/menu']);
          this.presentToast_result_login(res["username"]);
          this.storage.set('username', res["username"]);
          this.storage.set('hos_guid', res["hos_guid"]);
          this.storage.set('fullname', res["fname"] + ' ' + res["lname"]);
          this.storage.set('u_id', res['rf_id']);

        } else {
          this.res_login = null;
          this.presentToast_result_login(res["message"]);
        }
        console.log(this.fullname);
        console.log(this.res_login);
      })
    }
  }
  $login_with_qrcode() {
    if (this.station === null) {
      this.presentLoading();
      this.presentToast_station_null();
    } else {
      this.barcodeScanner.scan().then(barcodeData => {
        let data = { "qrcode_id": barcodeData["text"] };
        // let data ={"qrcode_id": "P0006"};
        this.http.post<any>(url + 'api/qrcodelogin', data).subscribe(res => {
          console.log(res);
          if (res["status"] === 200) {
            this.res_login = res;
            this.router.navigate(['/menu']);
            this.presentToast_result_login(res["username"]);
            this.storage.set('username', res["username"]);
            this.storage.set('hos_guid', res["hos_guid"]);
            this.storage.set('fullname', res["fname"] + ' ' + res["lname"]);
            this.storage.set('u_id', res['rf_id']);

          } else {
            this.res_login = null;
            this.presentToast_result_login(res["message"]);
          }
          console.log(this.res_login);
        })

      }).catch(err => {
        console.log('Error', err);
        this.qrcodetToast_err(err);
      });
    }
  }


  $us_sys() {
    if (this.station === null) {
      this.presentToast_station_null();
    } else {
      this.router.navigate(['/menu']);
    }
  }


  optionsFn(event) {

    this.station = event.detail.value;
    this.storage.set('Station', this.station);
    console.log(this.station);

  }

}

