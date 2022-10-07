import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportStatusPageRoutingModule } from './report-status-routing.module';

import { ReportStatusPage } from './report-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportStatusPageRoutingModule
  ],
  declarations: [ReportStatusPage]
})
export class ReportStatusPageModule {}
