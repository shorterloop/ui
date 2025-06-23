import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AutoTourTriggerComponent } from './components/auto-tour-trigger/auto-tour-trigger.component';
import { TourModalComponent } from './components/tour-modal/tour-modal.component';
import { TourTriggerComponent } from './components/tour-trigger/tour-trigger.component';

@NgModule({
  declarations: [
    TourModalComponent,
    AutoTourTriggerComponent,
    TourTriggerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TourModalComponent,
    AutoTourTriggerComponent,
    TourTriggerComponent
  ],
})
export class ShorterLoopProductTourModule { }
