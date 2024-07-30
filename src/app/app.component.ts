import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanComponent } from '../../projects/ui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KanbanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shui';


  workflowItems = [
    {
      "id": 1,
      "heading": "To-Do",
      "tasks": [],
      "action": {
        "label": "+ Add opportunity"
      }
    },
    {
      "id": 2,
      "heading": "In-Progress",
      "tasks": [],
      "action": {}
    },
    {
      "id": 3,
      "heading": "Done",
      "tasks": [
        {
          "id": 1,
          "header": [
            {
              type: 'link', label: 'EP-1', event: ($event: any, column: any) => {
                console.log("Added new experiment action performed: ", column, $event);
              }
            },
            { type: 'chip', value: [{ value: 'Tag 1', backgroundColor: '#FFF1F1', foregroundColor: '#D3272A' }, { value: 'Tag 2', backgroundColor: '#009042' }] },
          ],
          "body": {
            "summary": "Improve User Login Experience",
            "action": {}
          },
          "footer": [],
          "borderColor": " #4784FC"
        },
        {
          "id": 2,
          "header": [
            {
              type: 'link', label: 'EP-2', event: ($event: any, column: any) => {
                console.log("Added new experiment action performed: ", column, $event);
              }
            },
            { type: 'chip', value: [{ value: 'Tag 1', backgroundColor: '#FFF1F1', foregroundColor: '#D3272A' }, { value: 'Tag 2', backgroundColor: '#009042' }] },
          ],
          "body": {
            "summary": "Implement Task Dependencies",
            "action": {},
            contenteditable: true,
          },
          "footer": [],
          "borderColor": " #4784FC"
        }
      ],
      "action": {}
    }
  ];


  itemOrderChanged($event: any) {
    $event;
    debugger
  }

  cardUpdated($event: any) {
    $event;
    debugger

  }
}
