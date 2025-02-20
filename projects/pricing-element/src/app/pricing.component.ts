import { Component } from '@angular/core';
import { PricingTableService } from './pricing-table.service';

interface Plan {
  id: number;
  planName: string;
  description: string | null;
  stripePlanKey: string;
  amount: string;
  currency: string;
  stripePlanLookupKey: string | null;
}

interface Product {
  id: number;
  productName: string;
  description: string;
  stripeProductKey: string;
  plans: Plan[];
  features: { [key: string]: string[] };
  restrictions: { [key: string]: number };
}

@Component({
  selector: 'shorterloop-pricing-table',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  // Selected plan period: 'month' or 'year'
  selectedPlan: string = 'month';
  products = [];
  constructor(private pricing: PricingTableService) {
    this.pricing.getPlanDetails().subscribe(result => {
      this.products = result || [];
    });
  }

  // Helper method to iterate over object keys in the template
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Helper to filter plans by selected period (month or year)
  getPlansByPeriod(product: Product, period: string): Plan[] {
    return product.plans.filter(plan => plan.planName.toLowerCase() === period);
  }
}
