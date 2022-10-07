import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StackPageRoutingModule } from './stack-routing.module';

import { StackPage } from './stack.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StackPageRoutingModule
  ],
  declarations: [StackPage]
})
export class StackPageModule {}
