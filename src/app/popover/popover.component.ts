import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private socket: Socket,private storage: Storage, private toastController: ToastController) {
    this.socket.connect();
   }
  options =[1,2,3,4,5]
  station: any;
  toggleStatusEvent=true;
  toggleThemeEvent =true;
  StatusEvent:boolean;
  ThemeEvent: boolean;

  async presentToast_Station_close() {
    const toast = await this.toastController.create({
      message: 'Station Close.',
      duration: 5000
    });
    toast.present();
  }
  async presentToast_Station_open() {
    const toast = await this.toastController.create({
      message: 'Station Open.',
      duration: 5000
    });
    toast.present();
  }

  ngOnInit() {
    this.storage.get('StatusEvent').then((val) => {
      this.StatusEvent =val;
      console.log(this.StatusEvent);
    });
    this.storage.get('ThemeEvent').then((val) => {
      this.ThemeEvent =val;
      console.log(this.ThemeEvent);
    });
    this.storage.get('Station').then((val) => {
      this.station =val;
      console.log(this.station);
    });
  }

  toggleTheme(event){
    this.toggleThemeEvent = event.detail.checked; 
    if (this.toggleThemeEvent) {
      document.body.setAttribute('color-theme','light');
      this.storage.set('ThemeEvent', event.detail.checked);
    }else{
       document.body.setAttribute('color-theme','dark');
      this.storage.set('ThemeEvent', event.detail.checked);

    }     
  } 

  toggleStatus(event){
    this.toggleStatusEvent = event.detail.checked;

    if (this.toggleStatusEvent ==true) {
        this.storage.set('StatusEvent', event.detail.checked);
        this.storage.get('Station').then((val) => {
          this.station =val;
          this.socket.emit('station_cfg_open',this.station);
          this.presentToast_Station_open();
        });
    }else{
        this.storage.set('StatusEvent', event.detail.checked);
        this.storage.get('Station').then((val) => {
          this.station =val;
          this.socket.emit('station_cfg_close',this.station);
          this.presentToast_Station_close();
        });
    } 
  }
  


  
}
