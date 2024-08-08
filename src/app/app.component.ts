import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { SampleSizeCalculator, KanbanComponent } from '../../projects/ui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSelectModule, MatIconModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, KanbanComponent, SampleSizeCalculator],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  calculatorForm: FormGroup;

  title = 'Ui testing';
  criteria = {
    populationSize: '',
    confidenceLevel: 1.96,
    targetMarginOfError: 0.05,
    resultMinValue: 5,
    resultMaxValue: 100,
    recommendedSampleSize: 385
  }

  confidenceOptions = [
    { value: 1.44, label: '85%' },
    { value: 1.645, label: '90%' },
    { value: 1.96, label: '95%' },
    { value: 2.05, label: '96%' },
    { value: 2.17, label: '97%' },
    { value: 2.33, label: '98%' },
    { value: 2.58, label: '99%' }
  ];

  marginOptions = [
    { value: 0.01, label: '1%' },
    { value: 0.02, label: '2%' },
    { value: 0.03, label: '3%' },
    { value: 0.04, label: '4%' },
    { value: 0.05, label: '5%' },
    { value: 0.06, label: '6%' },
    { value: 0.07, label: '7%' },
    { value: 0.08, label: '8%' },
    { value: 0.09, label: '9%' },
    { value: 0.1, label: '10%' }
  ]
  sections = [
    {
      label: 'POPULATION SIZE',
      formControlName: 'populationSize',
      type: 'input',
      class: '',
    },
    {
      label: 'TARGET CONFIDENCE',
      formControlName: 'confidenceLevel',
      type: 'select',
      options: this.confidenceOptions,
      class: '',
    },
    {
      label: 'ACCEPTABLE ERROR MARGIN',
      formControlName: 'targetMarginOfError',
      type: 'select',
      options: this.marginOptions,
      class: 'margin_section',
    },
  ];
  workflowItems = [{ "id": 1, "heading": "To-Do", "belongsTo": { "link": "https://google.com", "label": "test:", "value": "hii" }, "tasks": [{ "id": 677, "header": [{ "type": "link", "label": "EXP-9", "action": {} }], "body": { "summary": "dinesh", "contenteditable": true }, "footer": [{ "type": "avatar", "label": "Dinesh Rawat", "photo": "https://lh3.googleusercontent.com/a/ACg8ocJTugolJHj_GPAbzRHaM5jBBxKuNnFfpqzA10jlaTdwcHMndg=s96-c" }], "borderColor": "#4784fc" }, { "id": 671, "header": [{ "type": "link", "label": "EXP-3", "action": {} }], "body": { "summary": "new exp hello workd d kshitij", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }, { "id": 673, "header": [{ "type": "link", "label": "EXP-5", "action": {} }], "body": { "summary": "asd", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }], "action": { "label": "+ Add experiment" } }, { "id": 2, "heading": "In-Progress", "belongsTo": { "link": "https://google.com", "label": "test:", "value": "hii" }, "tasks": [{ "id": 672, "header": [{ "type": "link", "label": "EXP-4", "action": {} }], "body": { "summary": "asd", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }, { "id": 674, "header": [{ "type": "link", "label": "EXP-6", "action": {} }], "body": { "summary": "Gmail", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }], "action": {} }, { "id": 3, "heading": "Review", "belongsTo": { "link": "https://google.com", "label": "test:", "value": "hii" }, "tasks": [{ "id": 626, "header": [{ "type": "link", "label": "EXP-1", "action": {} }], "body": { "summary": "ttt", "contenteditable": true }, "footer": [{ "type": "budget", "label": "Budget", "value": "$20.00" }, { "type": "timeFrame", "label": "Due Date", "value": "30 Jun 2024" }], "borderColor": "#ff5c7f" }, { "id": 676, "header": [{ "type": "link", "label": "EXP-8", "action": {} }], "body": { "summary": "Exp", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }], "action": {} }, { "id": 4, "heading": "Done", "belongsTo": { "link": "https://google.com", "label": "test:", "value": "hii" }, "tasks": [{ "id": 670, "header": [{ "type": "link", "label": "EXP-2", "action": {} }], "body": { "summary": "New Experiment", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }, { "id": 675, "header": [{ "type": "link", "label": "EXP-7", "action": {} }], "body": { "summary": "e", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }], "action": {} }]
    ;

  constructor(private fb: FormBuilder) {
    this.calculatorForm = this.fb.group({
      populationSize: [''],
      confidenceLevel: [95],
      targetMarginOfError: [5],
      resultMinValue: [''],
      resultMaxValue: [''],
      recommendedSampleSize: ['']
    });
    this.calculatorForm.patchValue({
      populationSize: this.criteria.populationSize || '',
      confidenceLevel: this.criteria.confidenceLevel || '',
      targetMarginOfError: this.criteria.targetMarginOfError || '',
      resultMinValue: this.criteria.resultMinValue || '',
      resultMaxValue: this.criteria.resultMaxValue || '',
      recommendedSampleSize: this.criteria.recommendedSampleSize || 0
    });
  }

  itemOrderChanged($event: any) {
    $event;
  }
  onInputMin(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);

    if (value > 9) {
      input.value = '9';
      // Update the form control value
      this.calculatorForm.get('resultMinValue')?.setValue(9);
    }
  }
  onInputMax(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = parseFloat(inputElement.value);

    if (value > 100) {
      value = 100;
      inputElement.value = '100';
    } else if (value < 0) {
      value = 0;
      inputElement.value = '0';
    }

    const controlName = inputElement.getAttribute('formControlName');
    if (controlName) {
      this.calculatorForm.get(controlName)?.setValue(value);
    }
  }

  cardUpdated($event: any) {
    $event;
    debugger

  }
}
