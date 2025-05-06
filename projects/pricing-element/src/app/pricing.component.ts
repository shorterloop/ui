import { Component } from '@angular/core';
import { PricingTableService } from './pricing-table.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog.component';
import { EnterprisePopupComponent } from './enterprise-plan-popup/enterprise-popup.component';
import { DowngradePopupComponent } from './downgrade-popup/downgrade-popup.component';
const STRIPE_PAYMENT_FAILURES = [
  'incomplete',
  'incomplete_expired',
  'past_due',
  'canceled',
  'unpaid',
];
export const PRICING_PLANS = {
  startupUsdMonthly: 'startup-USD-Monthly',
  startupUsdYearly: 'startup-USD-Yearly',

  scaleupUsdMonthly: 'scaleup-USD-Monthly',
  scaleupUsdYearly: 'scaleup-USD-Yearly',

  enterprise: 'enterprise',
  enterpriseMonthly: 'enterprise-USD-Monthly',
  enterpriseYearly: 'enterprise-USD-Yearly',
  enterpriseMonthlyNoDash: 'enterpriseMonthly',
  enterpriseYearlyNoDash: 'enterpriseYearly',
};
export const STRIPE_PAYMENT_SUCCESS = ['active', 'trialing'];
export const STRIPE_TRIALING = 'trialing';
export const PLAN_TYPES = ['free', ...Object.values(PRICING_PLANS)];

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
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  // Selected plan period: 'month' or 'year'
  selectedPlan: string = 'month';
  isSubscriptionOwner = false;
  currentPlanText = 'Current Plan';
  subscription = { planType: '', planStatus: '', allowedUsers: 0 , planCycle: ''};
  currentPlan = '';

  buttonLabels: any = {};
  buttonActions: any = {};
  products = [];
  planCycle: any;
  constructor(
    private pricing: PricingTableService,
    private dialog: MatDialog,
  ) {
    this.pricing.getPlanDetails().subscribe((result) => {
      const enterprisePlan = {
        id: 8,
        productName: 'Enterprise',
        description: 'Large teams managing numerous initiatives at scale.',
        plans: [
          {
            id: 8,
            planName: 'year',
            description: 'enterprise-USD-Yearly',
          },
          {
            id: 9,
            planName: 'month',
            description: 'enterprise-USD-Monthly',
          },
        ],
        features: {},
        restrictions: {},
      };
      result.push(enterprisePlan);
      this.products = result || [];
    });
  }

  ngOnInit() {
    this.pricing.getCustomerCurrentPlan().subscribe((result) => {
      this.isSubscriptionOwner = result?.data?.isSubscriptionOwner;
      this.subscription = result.data.subscription_payment_plan;
      this.currentPlan = this.subscription.planType;
      this.planCycle = this.subscription.planCycle;

      if(this.currentPlan === PRICING_PLANS.enterprise && this.planCycle){
      this.currentPlan = `${PRICING_PLANS.enterprise}-USD-${this.planCycle}`
      }
      
      if (
        !(
          this.currentPlan === 'free' ||
          this.currentPlan === '' ||
          this.currentPlan === 'enterprise'
        )
      ) {
        const lastIndex = this.currentPlan.lastIndexOf('-');
        const mode = this.currentPlan
          .substring(lastIndex + 1)
          ?.toLocaleLowerCase();
        this.selectedPlan = mode?.replace('ly', '');
        this.getButtonLabels();
      } else {
        this.getButtonLabels();
      }
    });
  }

  payNow(switchTo: any) {
    if (!this.isSubscriptionOwner) {
      this.disallowUpgradeDueToPermission();
      return true;
    }
    let shouldUpgradeOrDowngrade = this.upgradeOrDowngrade(
      this.currentPlan,
      switchTo,
    );

    let { message, confimationButton, heading } = this.getConfirmationMessages(
      switchTo,
      shouldUpgradeOrDowngrade,
    );

    const isTrialingOrUnpaid =
      ['trialing', 'unpaid'].indexOf(this.subscription?.planStatus) > -1;
    if (
      (isTrialingOrUnpaid && this.currentPlan === switchTo) ||
      !this.currentPlan ||
      this.currentPlan === 'free'
    ) {
      this.goForPayment(switchTo);
      return true;
    }
    if (shouldUpgradeOrDowngrade === 'NO_CHANGE') {
      return true;
    }

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '576px',
      data: {
        message,
        buttonText: {
          ok: confimationButton,
          cancel: 'Cancel',
        },
        heading: heading,
        showHeading: true,
      },
    });
    // Check user's confimation
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.goForPayment(switchTo);
      }
    });
    return true;
  }

  downgradeToFree() {
    if (!this.isSubscriptionOwner) {
      this.disallowUpgradeDueToPermission();
      return true;
    }
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '576px',
      data: {
        message:
          'Are you sure you want to cancel your subscription and switch to Free Forever plan?',
        buttonText: {
          ok: 'Yes',
          cancel: 'Cancel',
        },
        heading: 'Delete story map',
      },
    });

    // Check user's confimation
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.pricing.deleteStripeSubscription().subscribe((result: any) => {
          window.location.href = '/settings/billing';
        });
      }
    });
    return true;
  }
  openEnterprisePlan() {
    this.dialog.open(EnterprisePopupComponent, {
      width: '45%',
      height: '600px',
      disableClose: false,
    });
  }

  getButtonLabels() {
    const labels: any = {};
    const plans = PLAN_TYPES;

    let currentPlanFound = false; // Variable to track if the current plan is found in the predefined plans
    const currentPlanIndex = plans.indexOf(this.currentPlan);

    let actions: any = {};
    const isNotTrying =
      STRIPE_PAYMENT_FAILURES.indexOf(this.subscription.planStatus) > -1;
    for (let i = 0; i < plans.length; i++) {
      let planName = plans[i];
      const planIndex = i;
      const isFree = !planName || planName === 'free';

      if (this.currentPlan === planName) {
        if (this.subscription.planStatus === 'unpaid') {
          labels[planName] = 'Subscribe';
        } else {
          labels[planName] = this.currentPlanText;
        }
        currentPlanFound = true;
      } else if (planIndex < currentPlanIndex) {
        labels[planName] = 'Downgrade';
      } else if (planIndex > currentPlanIndex) {
        labels[planName] = 'Upgrade';
      } else {
        labels[planName] = 'Subscribe';
      }

      actions[planName] = isNotTrying
        ? this.payNow.bind(this)
        : this.updateDowngradeUserSubscription.bind(this);
      if (isFree) {
        actions[planName] = this.downgradeToFree.bind(this);
      }
      // For enterprise plan, set the label to 'Contact Sales'
      if (
        planName === PRICING_PLANS.enterprise ||
        planName === PRICING_PLANS.enterpriseMonthly ||
        planName === PRICING_PLANS.enterpriseYearly ||
        planName === PRICING_PLANS.enterpriseMonthlyNoDash ||
        planName === PRICING_PLANS.enterpriseYearlyNoDash
      ) {
        labels[planName] = 'Contact Us';
        actions[planName] = this.openEnterprisePlan.bind(this);
        if (this.currentPlan === planName) {
          labels[planName] = this.currentPlanText;
          currentPlanFound = true;
        }
      } else {
        // Check if trialing
        if (this.subscription.planStatus === STRIPE_TRIALING) {
          if (this.currentPlan !== planName) {
            if (isFree) {
              labels[planName] = 'Downgrade';
              actions[planName] = this.downgradeToFree.bind(this);
            } else {
              labels[planName] = 'Start for 14 days';
              actions[planName] =
                this.updateDowngradeUserSubscription.bind(this);
            }
          } else {
            labels[planName] = 'Upgrade';
            actions[planName] = this.payNow.bind(this);
          }
        }
        if (this.subscription.planStatus === 'user_created') {
          if (!isFree) {
            labels[planName] = 'Start for 14 days';
            actions[planName] = this.startTrial.bind(this);
          } else {
            labels[planName] = this.currentPlanText;
            actions[planName] = '';
          }
        }
      }
    }

    // If the current plan is not found in predefined plans and the subscription is not in trialing status, set its label to this.currentPlanText
    if (!currentPlanFound && this.subscription.planStatus !== STRIPE_TRIALING) {
      labels[this.currentPlan] = this.currentPlanText;
      actions[this.currentPlan] = this.payNow.bind(this);
    }

    this.buttonLabels = labels;
    this.buttonActions = actions;
    return true;
  }

  startTrial(plan: any) {
    this.planChangeLocally(plan);
    this.pricing.startMyTrial(plan).subscribe((_) => {
      // this.toast.success('Your 14 days trial has started.');
      setTimeout((_: any) => {
        window.location.href = window.location.href;
      }, 1500);
    });
  }

  /**
   * Extracts the plan and mode from the given plan name.
   * @param {string} planName - The plan name string.
   * @returns {Object|null} An object containing the extracted plan and mode, or null if the plan name does not match the expected format.
   */
  extractPlanAndMode(planName: any) {
    const regex = /^(.*?)(?:-USD)?-(Monthly|Yearly)$/;
    const matches = planName.match(regex);

    if (matches && matches.length === 3) {
      const plan = matches[1];
      const mode = matches[2].toLowerCase(); // Convert mode to lowercase
      return { plan, mode };
    } else {
      return null; // or throw an error, depending on your preference
    }
  }

  private getConfirmationMessages(
    switchTo: any,
    shouldUpgradeOrDowngrade: string | boolean,
  ) {
    let message = '';
    let confimationButton = '';
    let heading = '';
    const currentPlanAndModel: any = this.extractPlanAndMode(this.currentPlan);
    const switchToPlanAndModel: any = this.extractPlanAndMode(switchTo);
    if (shouldUpgradeOrDowngrade === 'UPGRADE') {
      heading = 'You are upgrading from startup to scale up plan.';
      message = `<div>
          <strong>You are upgrading from ${currentPlanAndModel.plan} to ${switchToPlanAndModel.plan} plan.</strong>
        </div> You can manage multiple products and much more.`;
      confimationButton = `Upgrade to ${switchToPlanAndModel.plan}`;

      if (currentPlanAndModel.plan === switchToPlanAndModel.plan) {
        heading = `Change to ${switchToPlanAndModel.mode} subscription`;
        message = `You are changing from ${currentPlanAndModel.plan} ${currentPlanAndModel.mode} to  ${switchToPlanAndModel.mode} plan.`;
        confimationButton = 'Change plan';
      }
    }

    if (shouldUpgradeOrDowngrade === 'DOWNGRADE') {
      if (currentPlanAndModel.plan === switchToPlanAndModel.plan) {
        heading = `Change to ${switchToPlanAndModel.mode} subscription`;
        message = `You are changing from ${currentPlanAndModel.plan} ${currentPlanAndModel.mode} to ${switchToPlanAndModel.mode} plan.`;
        confimationButton = 'Change plan';
      }
    }
    return { message, confimationButton, heading };
  }

  private disallowUpgradeDueToPermission() {
    this.dialog.open(AlertDialogComponent, {
      width: '576px',
      data: {
        message:
          "Unfortunately, only the subscription owner can modify the plan. Kindly get in touch with the super admin or contact us for assistance at <href='mailto:support@shorterloop.com'>support@shorterloop.com</a>.",
        buttonText: {
          ok: 'Ok',
        },
        hideCancel: true,
        heading: 'Plan Modification Authorization Update',
        showHeading: true,
      },
    });
  }

  updateDowngradeUserSubscription(switchTo = '') {
    if (!this.isSubscriptionOwner) {
      this.disallowUpgradeDueToPermission();
      return true;
    }
    // Ensure `this.products` is an array of `Product`
    const pricingPlan: Product[] = this.products as Product[];

    // Find the product that has a plan matching `switchTo`
    const matchedProduct: Product | undefined = pricingPlan.find(
      (product: Product) =>
        product.plans.some((plan: Plan) => plan.description === switchTo),
    );

    const shouldUpgradeOrDowngrade = this.upgradeOrDowngrade(
      this.currentPlan,
      switchTo,
    );

    let { message, confimationButton, heading } = this.getConfirmationMessages(
      switchTo,
      shouldUpgradeOrDowngrade,
    );

    const isTrialing = this.subscription?.planStatus === 'trialing';
    if (
      (isTrialing && this.currentPlan === switchTo) ||
      !this.currentPlan ||
      this.currentPlan === 'free'
    ) {
      this.goForPayment(switchTo);
      return true;
    }
    if (shouldUpgradeOrDowngrade === 'NO_CHANGE') {
      return true;
    }
    const currentPlanAndModel: any = this.extractPlanAndMode(this.currentPlan);
    const switchToPlanAndModel: any = this.extractPlanAndMode(switchTo);
    let dialogRef;

    if (
      shouldUpgradeOrDowngrade === 'DOWNGRADE' &&
      currentPlanAndModel.plan !== switchToPlanAndModel.plan &&
      matchedProduct
    ) {
      // Extract restrictions safely
      const { users, teams, products } = matchedProduct.restrictions;

      dialogRef = this.dialog.open(DowngradePopupComponent, {
        width: '50%',
        height: '570px',
        disableClose: false,
        data: { users, teams, products },
      });
    } else {
      dialogRef = this.dialog.open(AlertDialogComponent, {
        width: '576px',
        data: {
          message,
          buttonText: { ok: confimationButton, cancel: 'Cancel' },
          heading,
          showHeading: true,
        },
      });
    }

    // Handle dialog close event only if it was opened
    dialogRef?.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.planChangeLocally(switchTo);
        this.pricing
          .upgradeDowngrade({
            quantity: this.subscription.allowedUsers,
            switchTo,
          })
          .subscribe((result: any) => {
            setTimeout(() => {
              window.location.href = result?.url || '/settings/billing';
            }, 500);
          });
      }
    });

    return true;
  }

  private goForPayment(switchTo: any) {
    this.pricing.openCustomerPortal(switchTo).subscribe((result: any) => {
      if (result.success) {
        setTimeout((_: any) => {
          if (result.url) {
            window.location.href = result.url;
          } else {
            window.location.reload();
          }
        }, 1000);
      }
    });
  }

  private planChangeLocally(switchTo: any) {
    const subscriptionDetails: any = localStorage.getItem(
      'subscription-details',
    );
    const details = JSON.parse(subscriptionDetails);
    details.subscription_payment_plan.planType = switchTo;
    const stringifiedDetails = JSON.stringify(details);
    localStorage.setItem('subscription-details', stringifiedDetails);
  }

  // Helper method to iterate over object keys in the template
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Helper to filter plans by selected period (month or year)
  getPlansByPeriod(product: Product, period: string): Plan[] {
    return product.plans.filter(
      (plan) => plan.planName.toLowerCase() === period,
    );
  }

  upgradeOrDowngrade(currentPlan: any, switchTo: any) {
    const plansOrder = PLAN_TYPES;
    const currentPlanIndex = plansOrder.indexOf(currentPlan);
    const switchToIndex = plansOrder.indexOf(switchTo);

    if (currentPlanIndex === -1 || switchToIndex === -1) {
      return true;
    }

    if (currentPlanIndex < switchToIndex) {
      return 'UPGRADE';
    } else if (currentPlanIndex > switchToIndex) {
      return 'DOWNGRADE';
    } else {
      return 'NO_CHANGE';
    }
  }

/**
 * Returns all unique feature categories, excluding "uncategorized".
 */
getAllFeatureCategories(products: Product[]): string[] {
  return Array.from(
    new Set(products.flatMap((product) => Object.keys(product.features)))
  ).filter((category) => category.toLowerCase() !== "uncategorized");
}

/**
 * Returns a list of unique features under a category.
 */
getAllFeatures(products: Product[], category: string): string[] {
  const features = new Set<string>();

  products.forEach((product) => {
    product.features?.[category]?.forEach((feature) => {
      features.add(feature);
    });
  });

  return Array.from(features);
}

/**
 * Returns all unique features under the "uncategorized" category.
 */
getUncategorizedFeatures(products: Product[]): string[] {
  return Array.from(
    new Set(products.flatMap((product) => product.features?.["uncategorized"] || []))
  );
}

/**
 * Converts restriction values into properly formatted display strings.
 */
getFormattedRestriction(featureKey: string, value: number | undefined): string {
  if (value === undefined || value === null) return "Unlimited";
  if (value === -1) return "Unlimited"; 
  if (value === 0) return "-";

  // Handle storage (convert KB to GB and append "GB")
  if (featureKey === "storageInKB" || featureKey === "files") {
    return `${Math.round(value / (1024 * 1024))} GB`;  // Convert KB to GB
  }

  // Handle API requests per month
  if (featureKey === "monthlyApiLimit") {
    return `${value} requests/month`;
  }

  return value.toString();
}

}
