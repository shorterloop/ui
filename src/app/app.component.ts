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
      "opportunity": {
        "id": 1,
        "header": [],
        "body": {
          "contenteditable": true,
          "summary": "Conduct research and analysis on emerging trends in renewable energy and sustainable technologies",
          action: {
            event: ($event: any, column: any) => {
              console.log("Added new experiment action performed: ", column, $event);
            }
          }
        },
        "footer": [],
        "borderColor": "#4784fc",
        "action": {
          "label": "+ Add Solution",
        }
      },
      "solutions": [
        {
          "solution": {
            "id": 1,
            "header": [],
            "body": {
              "summary": "Community Engagement Initiative"
            },
            "footer": [],
            "borderColor": "#4784fc",
            "action": {
              "label": "+ Add Experiment",
            }
          },
          "experiments": [
            {
              "id": 520,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-1"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "etee"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$50.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 521,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-2"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Hilooo"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$20.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 522,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-3"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Conduct research and analysis on emerging trends in renewable energy and sustainable technologies"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$200.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            }
          ]
        },
        {
          "solution": {
            "id": 1,
            "header": [],
            "body": {
              "summary": "I am testing"
            },
            "footer": [],
            "borderColor": "#4784fc",
            "action": {
              "label": "+ Add Experiment",
            }
          },
          "experiments": [
            {
              "id": 520,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-1"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Test experiment"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$50.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 521,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-2"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Hilooo"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$20.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 522,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-3"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Conduct research and analysis on emerging trends in renewable energy and sustainable technologies"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$200.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            }
          ]
        },
        {
          "solution": {
            "id": 1,
            "header": [],
            "body": {
              "summary": "I am testing 2.0"
            },
            "footer": [],
            "borderColor": "#4784fc",
            "action": {
              "label": "+ Add Experiment",
            }
          },
          "experiments": [
            {
              "id": 520,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-1"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Volcano EruptionWrite a secret message with lemon juice and reveal it by heating the paper"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$50.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 521,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-2"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Create a fizzy explosion by mixing baking soda and vinegar"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$20.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 522,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-3"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Conduct research and analysis on emerging trends in renewable energy and sustainable technologies"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$200.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            }
          ]
        },
      ]
    },
    {
      "opportunity": {
        "id": 2,
        "header": [],
        "body": {
          "summary": "Collaborate with cross-functional teams to develop strategies for integrating green technologies into everyday applications.\n"
        },
        "footer": [],
        "borderColor": "#4784fc",
        "action": {
          "label": "+ Add Solution",
          "icon": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667\" fill=\"#573DF4\"/></svg>"
        }
      },

      "solutions": [
        {
          "solution": {
            "id": 1,
            "header": [],
            "body": {
              "summary": "I am testing"
            },
            "footer": [],
            "borderColor": "#4784fc",
            "action": {
              "label": "+ Add Experiment",
            }
          },
          "experiments": [
            {
              "id": 520,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-1"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "etee"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$50.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 521,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-2"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Hilooo"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$20.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 522,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-3"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Conduct research and analysis on emerging trends in renewable energy and sustainable technologies"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$200.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            }
          ]
        },
        {
          "solution": {
            "id": 1,
            "header": [],
            "body": {
              "summary": "I am testing 2.0"
            },
            "footer": [],
            "borderColor": "#4784fc",
            "action": {
              "label": "+ Add Experiment",
            }
          },
          "experiments": [
            {
              "id": 520,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-1"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "etee"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$50.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 521,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-2"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Hilooo"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$20.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            },
            {
              "id": 522,
              "header": [
                {
                  "type": "link",
                  "label": "EXP-3"
                },
                {
                  "type": "chip",
                  "value": []
                }
              ],
              "body": {
                "summary": "Conduct research and analysis on emerging trends in renewable energy and sustainable technologies"
              },
              "footer": [
                {
                  "type": "budget",
                  "label": "Budget",
                  "value": "$200.00"
                },
                {
                  "type": "timeFrame",
                  "label": "Time Frame",
                  "value": "1 month"
                }
              ],
              "borderColor": "#4784fc"
            }
          ]
        },
      ]
    }
  ];
  tableHeaders = [{
    label: 'Opportunities',
    action: {
      event: ($event: any, column: any) => {
        console.log("Added new experiment action performed: ", column, $event);
      }
    }
  },
  {
    label: 'Solutions',
    action: {
      event: ($event: any, column: any) => {
        console.log("Added new experiment action performed: ", column, $event);
      }
    }
  },
  {
    label: 'Experiments',
    action: {
      event: ($event: any, column: any) => {
        console.log("3Added new experiment action performed: ", column, $event);
      }
    }
  }];


  cardUpdated($event: any) {
    $event;
    debugger
  }
}
