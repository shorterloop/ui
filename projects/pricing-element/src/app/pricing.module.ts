import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './pricing.component';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PricingComponent, AlertDialogComponent],
  exports: [PricingComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
})
export class PricingModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const pricingElement = createCustomElement(PricingComponent, {
      injector: this.injector,
    });
    customElements.define('shorterloop-pricing-table', pricingElement);
  }
}
