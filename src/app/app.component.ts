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
  title = 'Ui testing';


  workflowItems = [
    {
      "opportunityId": 0,
      "solutions": []
    },
    {
      "opportunityId": 199,
      "solutions": [
        {
          "solutionId": 0,
          "experiments": []
        },
        {
          "solutionId": 43,
          "experiments": [
            {
              "experimentId": 22,
              "id": 22,
              "experimentName": "new experiemnt",
              "externalKey": "EXP-11",
              "userId": "[]",
              "initiativeId": 1121,
              "artifactTableName": null,
              "artifactId": null,
              "wikiPageId": 0,
              "artifactExternalKey": null,
              "artifactCardId": null,
              "hypothesis": null,
              "cost": null,
              "startAt": null,
              "endAt": null,
              "steps": "",
              "criteria": null,
              "result": false,
              "color": "#4784fc",
              "urls": "[]",
              "complexity": null,
              "progress": "to-do",
              "status": "active",
              "order": 11,
              "planOrder": 11,
              "teamId": 0,
              "createdAt": "2024-08-05T09:43:18.000Z",
              "updatedAt": "2024-08-05T09:43:18.000Z",
              "summary": "new experiemnt"
            }
          ],
          "id": 43,
          "summary": "new sol",
          "description": "",
          "externalKey": "SOL-15",
          "userId": "[]",
          "color": "#4784fc",
          "status": "active",
          "teamId": 0,
          "urls": "[]",
          "reach": "0",
          "impact": "0",
          "confidence": "0",
          "effort": "0",
          "progress": "to-do",
          "subscriptionId": 1325,
          "initiativeId": 1121,
          "wikiPageId": 0,
          "order": 15,
          "planOrder": 15,
          "createdAt": "2024-08-05T09:43:06.000Z",
          "updatedAt": "2024-08-05T09:43:06.000Z"
        }
      ],
      "id": 199,
      "summary": "new opport",
      "description": "",
      "externalKey": "OPP-18",
      "userId": "[]",
      "color": "#4784fc",
      "urls": "[]",
      "spread": "0",
      "intensity": "0",
      "progress": "to-do",
      "status": "active",
      "teamId": 0,
      "subscriptionId": 1325,
      "initiativeId": 1121,
      "wikiPageId": 0,
      "order": 18,
      "planOrder": 18,
      "createdAt": "2024-08-05T09:42:59.000Z",
      "updatedAt": "2024-08-05T09:42:59.000Z"
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
