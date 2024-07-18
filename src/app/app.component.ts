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
          "header": [],
          "body": {
            "summary": "Improve User Login Experience",
            "action": {}
          },
          "footer": [],
          "borderColor": " #4784FC"
        },
        {
          "id": 2,
          "header": [],
          "body": {
            "summary": "Implement Task Dependencies",
            "action": {}
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
}
