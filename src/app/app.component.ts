import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { FormFieldComponent, KanbanComponent } from '../../projects/ui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSelectModule, MatIconModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, KanbanComponent, FormFieldComponent],
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
  workflowItems = [{ "opportunity": {}, "solutions": [] }, { "opportunity": {}, "solutions": [{ "solution": { "id": 45, "header": [{ "type": "link", "label": "SOL-2", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "ad", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Experiment", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "experiments": [] }] }, { "opportunity": {}, "solutions": [{ "solution": { "id": 46, "header": [{ "type": "link", "label": "SOL-3", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "as", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Experiment", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "experiments": [] }] }, { "opportunity": {}, "solutions": [{ "solution": { "id": 47, "header": [{ "type": "link", "label": "SOL-4", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "asd", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Experiment", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "experiments": [] }] }, { "opportunity": { "id": 104, "header": [{ "type": "link", "label": "OPP-5", "action": {} }, { "type": "chip", "value": [{ "value": "in-progress", "displayValue": "In-Progress", "class": "inprogress_bg", "order": 2 }] }], "body": { "summary": "Too Many Requests Too Many Requests Too Many Requests Too Many Requests", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Solution", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "solutions": [{ "solution": {}, "experiments": [] }] }, { "opportunity": { "id": 105, "header": [{ "type": "link", "label": "OPP-6", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "Too Many Requests2", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Solution", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "solutions": [{ "solution": {}, "experiments": [] }] }, { "opportunity": {}, "solutions": [{ "solution": {}, "experiments": [{ "id": 670, "header": [{ "type": "link", "label": "EXP-2", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "New Experiment", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }] }] }];

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
