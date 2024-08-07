import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormFieldComponent, KanbanComponent } from '../../projects/ui/src/public-api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, KanbanComponent, FormFieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  experimentForm: FormGroup;

  title = 'Ui testing';

  workflowItems = [{ "opportunity": {}, "solutions": [] }, { "opportunity": {}, "solutions": [{ "solution": { "id": 45, "header": [{ "type": "link", "label": "SOL-2", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "ad", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Experiment", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "experiments": [] }] }, { "opportunity": {}, "solutions": [{ "solution": { "id": 46, "header": [{ "type": "link", "label": "SOL-3", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "as", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Experiment", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "experiments": [] }] }, { "opportunity": {}, "solutions": [{ "solution": { "id": 47, "header": [{ "type": "link", "label": "SOL-4", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "asd", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Experiment", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "experiments": [] }] }, { "opportunity": { "id": 104, "header": [{ "type": "link", "label": "OPP-5", "action": {} }, { "type": "chip", "value": [{ "value": "in-progress", "displayValue": "In-Progress", "class": "inprogress_bg", "order": 2 }] }], "body": { "summary": "Too Many Requests Too Many Requests Too Many Requests Too Many Requests", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Solution", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "solutions": [{ "solution": {}, "experiments": [] }] }, { "opportunity": { "id": 105, "header": [{ "type": "link", "label": "OPP-6", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "Too Many Requests2", "contenteditable": true }, "footer": [], "borderColor": "#4784fc", "action": { "label": "+ Add Solution", "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>" } }, "solutions": [{ "solution": {}, "experiments": [] }] }, { "opportunity": {}, "solutions": [{ "solution": {}, "experiments": [{ "id": 670, "header": [{ "type": "link", "label": "EXP-2", "action": {} }, { "type": "chip", "value": [{ "value": "to-do", "displayValue": "To-Do", "class": "todo_bg", "order": 1 }] }], "body": { "summary": "New Experiment", "contenteditable": true }, "footer": [], "borderColor": "#4784fc" }] }] }];

  constructor(private fb: FormBuilder) {
    this.experimentForm = this.fb.group({
      populationSize: [''],
      confidenceLevel: [95],
      targetMarginError: [5],
      minExpectedResults: [1],
      maxExpectedResults: [1],
      recommendedSampleSize: ['']
    });
  }

  itemOrderChanged($event: any) {
    $event;
  }

  cardUpdated($event: any) {
    $event;
    debugger

  }
}
