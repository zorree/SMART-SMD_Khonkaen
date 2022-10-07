import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderTransactionPageRoutingModule } from './order-transaction-routing.module';

import { OrderTransactionPage } from './order-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderTransactionPageRoutingModule
  ],
  declarations: [OrderTransactionPage]
})
export class OrderTransactionPageModule {}
