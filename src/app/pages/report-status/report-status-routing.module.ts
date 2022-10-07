import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportStatusPage } from './report-status.page';

const routes: Routes = [
  {
    path: '',
    component: ReportStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportStatusPageRoutingModule {}
