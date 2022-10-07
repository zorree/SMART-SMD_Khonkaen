import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './../../popover/popover.component';
@Component({
  selector: 'app-setting-dash',
  templateUrl: './setting-dash.page.html',
  styleUrls: ['./setting-dash.page.scss'],
})
export class SettingDashPage implements OnInit {
  color1;
  color2;
  color3;
  color4;
  color5;
  fontcolor;
  boxcolor;

  table1;
  table2;


  constructor(
    private socket:Socket,
    private popoverController: PopoverController
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
  ngOnInit() {
    
  }

  set_color_dash(){
    this.socket.emit('dash1_color', this.color1);
    this.socket.emit('dash2_color', this.color2);
    this.socket.emit('dash3_color', this.color3);
    this.socket.emit('dash4_color', this.color4);
    this.socket.emit('dash5_color', this.color5);
    this.socket.emit('fontcolor',this.fontcolor);
    this.socket.emit('boxcolor',this.boxcolor);
  }

 




}

