import { Component, OnInit } from '@angular/core';
import { PopoverComponent } from './../popover/popover.component';
import { Socket } from 'ngx-socket-io';
import { Storage } from '@ionic/storage';
import { ToastController, PopoverController } from '@ionic/angular';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { url } from '../../assets/dataUrl/url';
// const url = 'http://192.168.15.245:3000/';
// const url = 'http://192.168.2.2:3000/';


@Component({
  selector: 'app-move',
  templateUrl: './move.page.html',
  styleUrls: ['./move.page.scss'],
})
export class MovePage implements OnInit {

  station;
  data_scan;
  position;
  fullname;
  stack;
  stack_new;
  constructor(  
    private socket:Socket,
    private storage :Storage,
    private popoverController: PopoverController,
    private http:HttpClient,
    private alert:AlertController,
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

    async presentToast_Error_empty_stack_s1() {
      const toast = await this.toastController.create({
        message: 'ไม่พบข้อมูล.',
        duration: 5000
      });
      toast.present();
    }
    
    
  async presentAlertConfirm(msg,item) {
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
            this.move_to_stack(item);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.storage.get('Station').then((val) => {
      this.station =val;
      console.log(this.station); 
      this.play_load();
   }) 

    this.storage.get('position').then((val) => {
      this.position =val;

    })
    
    this.storage.get('fullname').then((val) => {
      this.fullname =val;

    })
  }
 

  play_load(){
    this.http.get(url+'api/list').subscribe((message) => {
        console.log(message); 
        if (message["msg"] === "empty") {
                  this.presentToast_Error_empty_stack_s1();
                }else{
                this.stack = message;
                }
       })
  }
  

  move(item){
    console.log(item);
    
    this.storage.get('Station').then((val) => {
      this.station =val;
      console.log(this.station);
   
      this.http.get(url+'api/checker').subscribe((message) => {
        console.log(message); 
        if (message["msg"] === "empty") {
                  this.presentToast_Error_empty_stack_s1();
                }else{
                this.stack_new = message;
                console.log(message[0].stack_name);
                console.log(message[0].stackcol);
                console.log(message[0].stackrow);
                var stack = message[0].stack_name+"-"+message[0].stackrow+"-"+message[0].stackcol;
                this.presentAlertConfirm(stack,item);
                }
       })
   }) 
  }


  move_to_stack(item){
   let result = this.stack.find( fruit => fruit.order_number === item);
    let stack_data ={
      order_number:result.order_number,
      stackname_old: result.stack_name,
      stackcol_old:result.stackcol,
      stackrow_old:result.stackrow,
      stackname_new:this.stack_new[0].stack_name,
      stackcol_new:this.stack_new[0].stackcol,
      stackrow_new:this.stack_new[0].stackrow
    };
    console.log(stack_data);
    this.http.post<any>(url+'api/move',stack_data).subscribe(res => {
        console.log(res);
      })
    
    this.refresh();


  }
  doRefresh(event) {
    console.log(event);
    
    console.log('Begin async operation');
        this.play_load();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  refresh(){
    this.ngOnInit();

  }
}
