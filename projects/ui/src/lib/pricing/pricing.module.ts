import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';


@NgModule({
  declarations: [
    PricingComponent,
  ],
  exports: [
    PricingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PricingModule { }
