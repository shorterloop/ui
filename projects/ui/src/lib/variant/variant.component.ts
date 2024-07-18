import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-variant',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonToggleModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.css'],

})
export class VariantComponent implements OnInit {
  isAddingVariant = false;
  variantForm: FormGroup = this.formBuilder.group({
    sampleSize: [],
    results: [],
    resultsType: ['%'],
  });
  criteriaForm: FormGroup = this.formBuilder.group({
    goal: ['highest'],
    function: ['automatic'],
    threshold: [],
    thresholdType: ['%'],
  });
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }
  addVariant() {
    this.isAddingVariant = true;
  }

  setCriteria(event: Event): void {
    // console.log(this.criteriaForm?.value);
  }
  createVariant(event: Event): void {
    // if (
    //   this.variantForm.value &&
    //   this.variantForm.value.sampleSize &&
    //   this.variantForm.value.results
    // ) {
    //   // console.log(this.variantForm?.value);
    //   this.isAddingVariant = false;
    // }
  }
}
