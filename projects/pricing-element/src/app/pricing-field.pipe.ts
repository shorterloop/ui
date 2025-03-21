  import { Pipe, PipeTransform } from '@angular/core';
  @Pipe({
      name: 'pricingField',
      pure: true,
    })
    export class PricingFieldPipe implements PipeTransform {
      transform(planValue: string, want='key'): any{  
        if (!planValue || typeof planValue !== 'string' || !planValue.includes('|')) {
          return planValue;
        }

    const [rawKey, rawValue] = planValue.split('|');
    const key = rawKey.trim();
    const value = rawValue.trim();
      if(want === 'key') {
        return value;
      }
      if(want === 'value') {
        return key;
      }
    }
  }