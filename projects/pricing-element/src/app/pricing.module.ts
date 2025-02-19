import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    PricingComponent,
  ],
  exports: [
    PricingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ]
})
export class PricingModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const pricingElement = createCustomElement(PricingComponent, { injector: this.injector });
    customElements.define('shorterloop-pricing-table', pricingElement);
  }
}
