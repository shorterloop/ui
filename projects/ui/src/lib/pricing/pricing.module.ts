import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { createCustomElement } from '@angular/elements';


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
export class PricingModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const pricingElement = createCustomElement(PricingComponent, { injector: this.injector });
    customElements.define('shorterloop-pricing-table', pricingElement);
  }
}
