import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDashPage } from './setting-dash.page';

const routes: Routes = [
  {
    path: '',
    component: SettingDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingDashPageRoutingModule {}
