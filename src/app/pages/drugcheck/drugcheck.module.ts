import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugcheckPageRoutingModule } from './drugcheck-routing.module';

import { DrugcheckPage } from './drugcheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugcheckPageRoutingModule
  ],
  declarations: [DrugcheckPage]
})
export class DrugcheckPageModule {}
