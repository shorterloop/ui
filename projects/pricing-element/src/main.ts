import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PricingModule } from './app/pricing.module';

platformBrowserDynamic().bootstrapModule(PricingModule)
  .catch(err => console.error(err));
