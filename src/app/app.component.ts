import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { url } from '../assets/dataUrl/url';

// const url = 'http://192.168.15.245:3000/';
// const url = 'http://192.168.2.2:3000/';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
 fullname:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alert:AlertController,
    private router:Router,
    private http:HttpClient,
    private storage:Storage,
     ) {
    this.initializeApp();
  }
  async presentAlertConfirm_exit() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'ยืนยัน',
      message: 'ออกจากระบบ',
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
            navigator['app'].exitApp();
            this.storage.set('fullname', null); 
            this.storage.set('position', null); 
            this.storage.set('token',null);
            this.storage.set('Station', null);

          }
        }
      ]
    });

    await alert.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
   
  exit(){
    this.storage.get('fullname').then((val) => {
    this.fullname =val;
    this.presentAlertConfirm_exit();
    let d={userlogin:this.fullname,status:"offwork"};
    this.http.post<any>(url+'api/login', d).subscribe(res => {
      console.log(res);
    }) 

    })
 
  }

}


