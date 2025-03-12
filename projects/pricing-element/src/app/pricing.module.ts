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
import { EnterprisePopupComponent } from './enterprise-plan-popup/enterprise-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DowngradePopupComponent } from './downgrade-popup/downgrade-popup.component';

@NgModule({
  declarations: [PricingComponent, AlertDialogComponent, EnterprisePopupComponent, DowngradePopupComponent],
  exports: [PricingComponent, ReactiveFormsModule],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule
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
