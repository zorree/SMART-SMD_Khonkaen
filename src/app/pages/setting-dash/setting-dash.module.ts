import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingDashPageRoutingModule } from './setting-dash-routing.module';

import { SettingDashPage } from './setting-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingDashPageRoutingModule
  ],
  declarations: [SettingDashPage]
})
export class SettingDashPageModule {}
