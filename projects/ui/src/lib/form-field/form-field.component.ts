import { AfterContentInit, Component, ContentChildren, forwardRef, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'shorterloop-sample-size-calculator',
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SampleSizeCalculator),
      multi: true
    }
  ],
  standalone: true,
  host: {
    class: 'shorterloop-sample-size-calculator'
  }
})
export class SampleSizeCalculator implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(NgControl, { descendants: true }) controlsArray!: QueryList<NgControl>;

  // Callbacks
  onChange: any = () => { };
  onTouched: any = () => { };

  ngAfterContentInit() {
    const controls = this.controlsArray.toArray();
    //@ts-ignore
    const recommendedSampleSizeControl = controls.find((control: any) => control.name === 'recommendedSampleSize') as FormControl;


    controls.forEach((control: any) => {
      if (control.control) {
        control.valueChanges?.subscribe((value: any) => {
          this.onChange(value);
          this.onTouched();

          if (recommendedSampleSizeControl) {
            const requiredControls = this.getRequiredControlNames(controls);
            const data = this.extractControlValues(controls, requiredControls);

            const recommendedSampleSize = this.calculateSampleSize(data);

            //@ts-ignore
            recommendedSampleSizeControl.control.setValue(recommendedSampleSize, { emitEvent: false });
          }
        });
      }
    });
  }


  /**
   * Retrieves the control names needed for extraction based on available fields.
   *
   * @param {Array} fields - The array of field objects.
   * @returns {Array} - An array of unique control names from the fields.
   */
  getRequiredControlNames(fields: any) {
    // Extract control names from fields and filter out undefined or null names
    return Array.from(new Set(fields.map((control: any) => control?.name).filter((name: any) => name)));
  }

  /**
 * Extracts the values of the specified controls from the fields array.
 *
 * @param {Array} fields - The array of field objects.
 * @param {Array} controlNames - The list of control names to extract values for.
 * @returns {Object} - An object containing the extracted control values.
 */
  extractControlValues(fields: any, controlNames: any) {
    const result: any = {};

    for (const control of fields) {
      if (controlNames.includes(control?.name)) {
        result[control.name] = control.value;
      }
    }

    return result;
  }

  /**
 * This function calculates the sample size required for an experiment. It uses the formula:
 * n = (Z^2 * p * (1 - p)) / E^2
 * where:
 * - n is the sample size
 * - Z is the z-score for the desired confidence interval
 * - p is the proportion of the population that has the attribute being measured
 * - E is the desired margin of error
 * If the population size is known and less than 1,000,000, the formula is adjusted to:
 * n = (Z^2 * p * (1 - p)) / (E^2 / (N / (N - 1) + 1))
 * where N is the population size
 *
 * @param {*} params
 * @returns {number} sampleSize
 * @description Calculate the sample size required for an experiment
 * @example calculateSampleSize({ confidenceLevel: 0.95, populationSize: 1000, resultMaxValue: 0.6, resultMinValue: 0.4, targetMarginOfError: 0.05 }); // 384
 */
  calculateSampleSize(params: any) {
    let {
      confidenceLevel,
      populationSize,
      resultMaxValue,
      resultMinValue,
      targetMarginOfError
    } = params;
    // if (!targetMarginOfError || !(resultMinValue && resultMaxValue)) return null;
    let proportion = this.determineProportionForCalculation(resultMinValue / 100, resultMaxValue / 100);
    let zScore = confidenceLevel;
    if (zScore === undefined) {
      throw new Error('Invalid confidence level provided');
    }
    let numerator = Math.pow(zScore, 2) * proportion * (1 - proportion) / Math.pow(targetMarginOfError, 2);
    // Handle unknown population size
    if (!populationSize || populationSize > 1000000) {
      return Math.ceil(numerator);
    } else {
      return Math.round(numerator / (numerator / populationSize + 1));
    }
  }
  /**
 * This function determines the proportion to use for the sample size calculation. It chooses the value that is further from 0.5
 * @param {*} minValue The minimum value of the proportion range (0-1)
 * @param {*} maxValue The maximum value of the proportion range (0-1)
 * @returns The proportion to use for the sample size calculation
 */
  determineProportionForCalculation(minValue = 0, maxValue = 1) {
    // If minValue is greater than 0.5 and less than 0.5, or
    // if minValue is less than 0.5 and maxValue is greater than 0.5, or
    // if maxValue is falsy (0, null, undefined, etc.), use 0.5
    if ((minValue > 0.5 && minValue < 0.5) ||
      (minValue < 0.5 && maxValue > 0.5) ||
      !maxValue) {
      return 0.5;
    }
    // Otherwise, use the value that's further from 0.5
    return Math.abs(0.5 - minValue) < Math.abs(0.5 - maxValue) ? minValue : maxValue;
  }


  // Write a new value to the element.
  writeValue(value: any): void {
    const controls = this.controlsArray.toArray();

    if (controls) {
      controls.forEach(control => {
        if (control.control) {
          control.control.setValue(value, { emitEvent: false });
        }
      });
    }
  }

  // Set the function to be called when the control receives a change event.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Set the function to be called when the control receives a touch event.
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Optional: to handle disabled state
  setDisabledState?(isDisabled: boolean): void {
    const controls = this.controlsArray.toArray();

    if (controls) {
      controls.forEach(control => {
        if (control.control) {
          isDisabled ? control.control.disable() : control.control.enable();
        }
      });
    }
  }
}
