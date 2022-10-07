import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderTransactionPage } from './order-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: OrderTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTransactionPageRoutingModule {}
