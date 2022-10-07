import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StackPage } from './stack.page';

const routes: Routes = [
  {
    path: '',
    component: StackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StackPageRoutingModule {}
