import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugcheckPage } from './drugcheck.page';

const routes: Routes = [
  {
    path: '',
    component: DrugcheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugcheckPageRoutingModule {}
