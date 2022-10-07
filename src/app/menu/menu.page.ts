import { Component, OnInit ,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../popover/popover.component';
import { Chart } from 'chart.js';
import { url } from '../../assets/dataUrl/url';
// const url = 'http://192.168.15.245:3000/';
// const url = 'http://192.168.2.2:3000/';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('barChart') barChart;

  fullname:any;
  username:any;
  u_id:any;

  bars: any;
  colorArray: any;
  barChartLabels:any;
  barChartData:any;
  class_obj :any;

  constructor(
    private router:Router,
    private toastController: ToastController,
    private popoverController: PopoverController,
    private http:HttpClient,
    private storage: Storage,
    private alert:AlertController

  ) { }
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
            this.storage.set('Station', null);

          }
        }
      ]
    });

    await alert.present();
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
  ngOnInit() {
     this.http.get(url+'api/7day').subscribe((message) => {
        console.log(message); 
        this.class_obj = message;        
       })


    //this.class_obj =[{"sum":"449","node_date":"2021-05-12T17:00:00.000Z"},{"sum":"561","node_date":"2021-05-11T17:00:00.000Z"},{"sum":"652","node_date":"2021-05-10T17:00:00.000Z"},{"sum":"11","node_date":"2021-05-09T17:00:00.000Z"},{"sum":"13","node_date":"2021-05-08T17:00:00.000Z"},{"sum":"20","node_date":"2021-05-07T17:00:00.000Z"},{"sum":"358","node_date":"2021-05-06T17:00:00.000Z"}];
      
  }
  ionViewDidEnter() {
     
    this.createBarChart();
  }
  createBarChart() {
  
     this.barChartLabels = this.class_obj.map(class_obj => class_obj.node_date.slice(0, 10));
     this.barChartData = this.class_obj.map(class_obj => class_obj.sum);

    console.log(this.barChartLabels);
    console.log(this.barChartData);
    
    
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: [{
          label: 'รายการ',
          data: this.barChartData,
          backgroundColor: 'rgb(38, 194, 129)', 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  ionViewWillEnter(){
    this.storage.get('username').then((val) => {
      this.username =val;
      console.log(this.username);
      
    })

    this.storage.get('fullname').then((val) => {
      this.fullname = val;
      console.log(this.fullname);
      
    })

    this.storage.get('u_id').then((val) => {
      this.u_id = val;
      console.log(this.u_id);
      
    })
    
  }


  exit(){
    this.storage.get('fullname').then((val) => {
    this.fullname =val;
    this.presentAlertConfirm_exit();
   
    })
 
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
