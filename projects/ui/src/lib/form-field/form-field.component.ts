import { Component, forwardRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'shorterloop-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormFieldComponent),
    multi: true
  }],
  standalone: true,
})
export class FormFieldComponent implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(FormControl) controls!: QueryList<FormControl>;
  private _value: any = {};
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  ngAfterContentInit(): void {
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this._value = value || {};
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
