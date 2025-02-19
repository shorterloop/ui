import { Component } from '@angular/core';

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

  // JSON data for products
  products: Product[] = [
    {
      "id": 7,
      "productName": "ADITI_TUE_18_1",
      "description": "ADITI_TUE_18_1 DESCRIPTION",
      "stripeProductKey": "prod_RnKAKOKTFBVptp",
      "plans": [
        {
          "id": 10,
          "planName": "month",
          "description": "You will not get 3 months free in this price",
          "stripePlanKey": "price_1QtjWGJNP6tuDWzm0CYfJsSc",
          "amount": "20400.00",
          "currency": "eur",
          "stripePlanLookupKey": "MONTHLY_MODEL"
        },
        {
          "id": 9,
          "planName": "month",
          "description": null,
          "stripePlanKey": "price_1QtjWGJNP6tuDWzmRS8M7Ti6",
          "amount": "10000.00",
          "currency": "eur",
          "stripePlanLookupKey": null
        }
      ],
      "features": {
        "Basic Usage": [
          "2 Users4",
          "2 Users",
          "5gb strorage"
        ],
        "Strategy": [
          "2 portfolio themes"
        ],
        "Discover": [
          "3 personas"
        ],
        "abc 1": [
          "xyz"
        ],
        "test": [
          "dinesh"
        ],
        "test2": [
          "2"
        ],
        "aditi494": [
          "aditi 12"
        ]
      },
      "restrictions": {
        "FEATURE 2": 2,
        "FEATURE 1": 1
      }
    },
    {
      "id": 8,
      "productName": "Big Boys Accessories",
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "stripeProductKey": "prod_RnLmHbW2MV0VOp",
      "plans": [
        {
          "id": 12,
          "planName": "month",
          "description": "Teams seeking to test multiple value propositions for building a resilient business model",
          "stripePlanKey": "price_1Qtl99JNP6tuDWzmdy4DzHFV",
          "amount": "4000.00",
          "currency": "eur",
          "stripePlanLookupKey": "BBT_MONTHLY"
        },
        {
          "id": 11,
          "planName": "year",
          "description": "Growing companies supporting product management for multiple products and teams",
          "stripePlanKey": "price_1Qtl53JNP6tuDWzmG8ambPeX",
          "amount": "200.00",
          "currency": "eur",
          "stripePlanLookupKey": "BBT_YEARLY"
        }
      ],
      "features": {
        "Basic usage": [
          "products 2",
          "user(s) 5"
        ],
        "Advanced usage": [
          "team(s) 5"
        ]
      },
      "restrictions": {
        "users": 10,
        "teams": 15,
        "products": 2
      }
    }
  ];

  // Helper method to iterate over object keys in the template
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Helper to filter plans by selected period (month or year)
  getPlansByPeriod(product: Product, period: string): Plan[] {
    return product.plans.filter(plan => plan.planName.toLowerCase() === period);
  }
}
