import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Output,
  QueryList,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
interface ComparisonFunction {
  (a: any, b: any): any;
}

const goalToComparisonFunction: { [key: string]: ComparisonFunction } = {
  HIGHEST_RESULT: (a: any, b: any) =>
    a.minValue > b.maxValue ? a : b.minValue > a.maxValue ? b : null,
  LOWEST_RESULT: (a: any, b: any) =>
    a.maxValue < b.minValue ? a : b.maxValue < a.minValue ? b : null,
};
@Component({
  selector: 'shorterloop-evaluate-experiment-variants',
  standalone: true,
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'shorterloop-evaluate-experiments',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EvaluateExperimentVariantsComponent),
      multi: true,
    },
  ],
})
export class EvaluateExperimentVariantsComponent
  implements ControlValueAccessor, AfterContentInit {
  @Output() winnerVariantFound = new EventEmitter<any>();

  @ContentChildren(NgControl, { descendants: true }) controlsArray!: QueryList<
    NgControl
  >;
  onChange: any = () => { };
  onTouched: any = () => { };

  private subscriptions: Subscription[] = [];

  ngAfterContentInit() {
    this.handleControlChanges();

    // Subscribe to changes in the QueryList
    this.controlsArray.changes.subscribe(() => {
      this.handleControlChanges();
    });
  }

  /**
 * Handles changes to the controls in the form.
 * This method unsubscribes from any previous control subscriptions to prevent memory leaks,
 * then subscribes to value changes in each control to handle change detection, form validation,
 * and winner variant evaluation.
 *
 * @private
 */
  private handleControlChanges() {
    // Clear previous subscriptions to avoid memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    const controls = this.controlsArray.toArray();

    controls.forEach((control: any) => {
      if (control.control) {
        const sub = control.valueChanges
          ?.pipe(debounceTime(300), distinctUntilChanged())
          .subscribe((value: any) => {
            this.onChange(value);
            this.onTouched();

            const requiredControls = this.getRequiredControlNames(controls);
            const data = this.extractControlValues(controls, requiredControls);
            const winnerVariant = this.evaluateExperiment(
              data?.variants,
              data.goal,
              data.threshold
            );
            if (winnerVariant) {
              this.winnerVariantFound.emit(winnerVariant);
            }
          });

        this.subscriptions.push(sub); // Keep track of all subscriptions
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions when the component is destroyed to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Retrieves the control names needed for extraction based on available fields.
   *
   * @param {Array} fields - The array of field objects.
   * @returns {Array} - An array of unique control names from the fields.
   */
  getRequiredControlNames(fields: any) {
    // Extract control names from fields and filter out undefined or null names
    return Array.from(
      new Set(
        fields.map((control: any) => control?.name).filter((name: any) => name)
      )
    );
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
    const arrayOfResults: any[] = [];

    // Temporarily store grouped controls for sampleSize, results, and resultSymbol
    const groupedControls: { [key: string]: any[] } = {
      sampleSize: [],
      result: [],
      resultSymbol: [],
      id: [],
    };

    for (const control of fields) {
      if (controlNames.includes(control?.name)) {
        if (groupedControls.hasOwnProperty(control.name)) {
          // Store the controls in the corresponding group using bracket notation
          groupedControls[control.name].push(control.value);
        } else {
          result[control.name] = control.value;
        }
      }
    }
    // Combine the grouped controls into an array of objects
    const numberOfGroups = groupedControls['sampleSize'].length;
    for (let i = 0; i < numberOfGroups; i++) {
      let resultValue = groupedControls['result'][i];
      const resultSymbol = groupedControls['resultSymbol'][i];
      const sampleSize = groupedControls['sampleSize'][i];

      // Convert result to percentage if resultSymbol is '#'
      if (resultSymbol === '#') {
        resultValue = (resultValue / sampleSize) * 100;
      }

      arrayOfResults.push({
        id: groupedControls['id'][i],
        sampleSize: groupedControls['sampleSize'][i],
        result: resultValue,
        minValue: resultValue,
        maxValue: resultValue,
        resultSymbol: resultSymbol,
      });
    }

    // Add the grouped results array to the result object
    result['variants'] = arrayOfResults;

    return result;
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

  /**
   * This function evaluates the results of an experiment with multiple variants. It compares the results of the variants
   * to determine the winner based on the specified goal (e.g., highest result, lowest result) and threshold. If a threshold
   * is provided, the function will also evaluate whether the winner is clearly above or below the threshold.
   *
   * @param {*} variants
   * @param {*} goal
   * @param {*} threshold
   * @returns {object} result
   */

  evaluateExperiment(variants: any, goal: any, threshold = null) {
    if (
      variants.length === 0 ||
      variants[0] == null ||
      (!threshold && variants.length === 1)
    ) {
      return { evaluation: 'INCONCLUSIVE', isInconclusive: true };
    }

    let comparisonFunction = goalToComparisonFunction[goal];
    let result =
      variants.length > 1
        ? this.compareVariants(variants, comparisonFunction)
        : { winner: variants[0], isInconclusive: false, evaluation: 'WINNER' };

    if (result.evaluation === 'INCONCLUSIVE') {
      if (!threshold) return result;
      let thresholdComparison = this.compareVariants(
        [this.createThresholdVariant(threshold), variants[0]],
        comparisonFunction
      );
      return this.evaluateAgainstThreshold(thresholdComparison);
    }

    if (threshold) {
      let thresholdComparison = this.compareVariants(
        [this.createThresholdVariant(threshold), result.winner],
        comparisonFunction
      );
      if (!thresholdComparison.winner)
        return { evaluation: 'INCONCLUSIVE', isInconclusive: true };
      if (
        thresholdComparison === null ||
        thresholdComparison.winner.id === 'THRESHOLD'
      ) {
        return {
          ...thresholdComparison,
          evaluation: 'CLEARLY_BELOW',
          isInconclusive: false,
        };
      }
    }

    return result;
  }

  /**
   * This function compares multiple variants to determine the winner based on the specified comparison function.
   * It iterates over the variants and compares them pairwise to find the overall winner.
   * @param {*} variants
   * @param {*} comparisonFunction
   * @returns An object containing the winner, whether the result is inconclusive, and the evaluation result
   */
  compareVariants(variants: any, comparisonFunction: any) {
    if (variants.length < 2) {
      return {
        winner: variants[0],
        isInconclusive: false,
        evaluation: 'WINNER',
      };
    }

    let winner = variants[0];
    let isInconclusive = false;

    for (let i = 1; i < variants.length; i++) {
      let comparisonResult = this.compareTwo(
        winner,
        variants[i],
        comparisonFunction
      );

      if (comparisonResult.isInconclusive) {
        isInconclusive = true;
        break;
      }

      if (comparisonResult.winner !== winner) {
        winner = comparisonResult.winner;
      }
    }

    return {
      winner: isInconclusive ? null : winner,
      isInconclusive: isInconclusive,
      evaluation: isInconclusive ? 'INCONCLUSIVE' : 'WINNER',
    };
  }

  /**
   * This function compares two variants based on the specified comparison function. It returns the variant that is the winner
   * @param {*} variantA
   * @param {*} variantB
   * @param {*} comparisonFunction
   * @returns An object containing the winner, whether the result is inconclusive, and the evaluation result
   */
  compareTwo(variantA: any, variantB: any, comparisonFunction: any) {
    if (!this.isValidVariant(variantA) || !this.isValidVariant(variantB)) {
      return { isInconclusive: true };
    }

    let winner = comparisonFunction(variantA, variantB);

    if (winner === null) {
      return { isInconclusive: true };
    }

    return {
      winner: winner,
      isInconclusive: false,
      evaluation: winner.id === 'THRESHOLD' ? 'CLEARLY_BELOW' : 'WINNER',
    };
  }

  /**
   * This function checks if a variant is valid. A valid variant must have numeric values for minValue, maxValue, and result.
   *
   * @param {*} variant
   * @returns {boolean} True if the variant is valid, false otherwise
   */
  isValidVariant(variant: any) {
    return (
      variant &&
      !isNaN(variant.minValue) &&
      !isNaN(variant.maxValue) &&
      !isNaN(variant.result)
    );
  }

  /**
   * This function creates a threshold variant with the specified threshold value.
   * @param {*} threshold The threshold value to use
   * @returns A threshold variant object
   */
  createThresholdVariant(threshold: any) {
    return {
      minValue: threshold,
      maxValue: threshold,
      resultPercentage: threshold,
      result: threshold / 100,
      id: 'THRESHOLD',
    };
  }

  /**
   * This function evaluates the comparison result against the threshold value.
   * If the winner is the threshold variant, it returns "CLEARLY_BELOW".
   * If the winner is not the threshold variant, it returns "WINNER".
   * If there is no winner, it returns "INCONCLUSIVE".
   * @param {*} comparison The comparison result object
   * @returns An object containing the winner, the evaluation result, and whether the result is inconclusive
   */
  evaluateAgainstThreshold(comparison: any) {
    if (!comparison.winner) {
      return {
        evaluation: 'INCONCLUSIVE',
        isInconclusive: true,
      };
    }

    if (comparison.winner.id === 'THRESHOLD') {
      return {
        winner: comparison.winner,
        evaluation: 'CLEARLY_BELOW',
        isInconclusive: false,
      };
    }

    return {
      winner: comparison.winner,
      evaluation: 'WINNER',
      isInconclusive: false,
    };
  }
}
