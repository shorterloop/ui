import type { Meta, StoryObj } from '@storybook/angular';
import { KanbanComponent } from '../lib/kanban/kanban.component';

const SVG_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2.667a.667.667 0 0 0-.662.588l-.005.078v4.334a2.333 2.333 0 0 0 2.206 2.33l.128.003h8.723l-2.195 2.195a.67.67 0 0 0-.055.88l.055.063a.67.67 0 0 0 .88.055l.063-.055 3.333-3.333a1 1 0 0 0 .065-.075l.047-.073.036-.076.024-.07.016-.078.005-.04.003-.06-.002-.05-.012-.084-.02-.074-.029-.074-.035-.065-.042-.061-.056-.063-3.333-3.333a.667.667 0 0 0-.998.88l.055.062 2.195 2.196H3.667a1 1 0 0 1-.996-.904l-.004-.096V3.333A.667.667 0 0 0 2 2.667" fill="#573DF4"/></svg>`;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<KanbanComponent> = {
  title: 'Components/Kanban',
  component: KanbanComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      summary: {
        component: 'This is a Kanban component that allows for managing tasks within columns and swimlanes. It supports drag-and-drop functionality and can be collapsed or expanded for a better user experience. The component showcases features like sorting cards, enabling drag-and-drop across swimlanes, showing or hiding empty rows, displaying item counts, and managing swimlane frozen rows.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<KanbanComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const kanbanData = [
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
          "action": {
            event: ($event: any, column: any) => {
              debugger
            }
          }
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

const kanbanDataWithSwimlanes = [
  {
    id: 1,
    heading: 'User Journey',
    columns: [
      {
        id: 1,
        heading: 'To Do',
        tasks: [
          {
            id: 1,
            header: [
              {
                type: 'link', label: 'EP-1', event: ($event: any, column: any) => {
                  console.log("Added new experiment action performed: ", column, $event);
                }
              },
              { type: 'chip', value: [{ value: 'Tag 1', backgroundColor: '#FFF1F1', foregroundColor: '#D3272A' }, { value: 'Tag 2', backgroundColor: '#009042' }] },
            ],
            body: { summary: 'User-Perceived Value Validation. User-Perceived Value Validation' },
            footer: [
              { type: 'avatar', label: 'Dinesh Rawat', photo: 'https://picsum.photos/201' },
              { type: 'budget', label: 'Budget', value: '$100' },
              { type: 'timeFrame', label: 'Time Frame', value: '1 month' },
            ],
            borderColor: '#4784fc'
          },
          {
            id: 2,
            header: [
              { type: 'link', label: 'EP-2', url: 'https://another-example.com' },
              { type: 'chip', value: [{ value: 'Tag 3', backgroundColor: 'green' }, { value: 'Tag 4', backgroundColor: 'orange' }] },
            ],
            body: { summary: 'Description for Task 2' },
            footer: [
              { type: 'avatar', label: 'John Doe', photo: 'https://picsum.photos/200' },
              { type: 'budget', label: 'Budget', value: '$200' },
              { type: 'timeFrame', label: 'Time Frame', value: '2 months' },
            ],
            borderColor: '#4784fc'
          },
        ],
        toggleColumn: true,
        action: {
          label: '+ Add experiment',
          event: ($event: any, column: any) => {
            console.log("Added new experiment action performed: ", column, $event);
          }
        }
      },
      {
        id: 2,
        heading: 'In Progress',
        tasks: [
          {
            id: 3,
            header: [
              { type: 'link', label: 'EP-3', url: 'https://third-example.com' },
              { type: 'chip', value: [{ value: 'Tag 5', backgroundColor: 'purple' }] },
            ],
            body: { summary: 'Description for Task 3' },
            footer: [
              { type: 'avatar', label: 'Jane Smith', photo: 'https://picsum.photos/202' },
              { type: 'budget', label: 'Budget', value: '$300' },
              { type: 'timeFrame', label: 'Time Frame', value: '3 months' },
            ],
            borderColor: '#FFCA11'
          },
          {
            id: 4,
            header: [
              { type: 'link', label: 'EP-4', url: 'https://fourth-example.com' },
              { type: 'chip', value: [{ value: 'Tag 6', backgroundColor: 'brown' }] },
            ],
            body: { summary: 'User-Perceived Value Validation' },
            footer: [
              { type: 'avatar', label: 'Michael Johnson', photo: 'https://picsum.photos/203' },
              { type: 'budget', label: 'Budget', value: '$400' },
              { type: 'timeFrame', label: 'Time Frame', value: '4 months' },
            ],
            borderColor: '#4784fc'
          },
        ],
        toggleColumn: true,
      },
      {
        id: 3,
        heading: 'Done',
        tasks: [
          {
            id: 5,
            header: [
              { type: 'link', label: 'EP-5', url: 'https://fifth-example.com' },
              { type: 'chip', value: [{ value: 'Tag 7', backgroundColor: 'pink', foregroundColor: '#000000' }] },
            ],
            body: { summary: 'Description for Completed Task 1', contenteditable: true },
            footer: [
              { type: 'avatar', label: 'Sarah Adams', photo: 'https://picsum.photos/204' },
              { type: 'budget', label: 'Budget', value: '$500' },
              { type: 'timeFrame', label: 'Time Frame', value: '5 months' },
            ],
            borderColor: '#FFCA11'
          },
          {
            id: 6,
            header: [
              { type: 'link', label: 'EP-6333', url: 'https://sixth-example.com' },
              { type: 'chip', value: [{ value: 'Tag 8', backgroundColor: 'yellow', foregroundColor: '#000000' }] },
            ],
            body: { summary: 'Description for Completed Task 2' },
            footer: [
              { type: 'avatar', label: 'Emily Wilson', photo: 'https://picsum.photos/205' },
              { type: 'budget', label: 'Budget', value: '$600' },
              { type: 'timeFrame', label: 'Time Frame', value: '6 months' },
            ],
            borderColor: '#4784fc'
          },
        ],
        toggleColumn: true,
      }
    ]
  },
  {
    id: 2,
    heading: 'Technical Implementation',
    columns: [
      {
        id: 1,
        heading: 'To Do',
        tasks: [
          {
            id: 7,
            header: [
              {
                type: 'link', label: 'EP-7', event: ($event: any, column: any) => {
                  console.log("Added new experiment action performed: ", column, $event);
                }
              },
              { type: 'chip', value: [{ value: 'Tag 9', backgroundColor: '#FFF1F1', foregroundColor: '#D3272A' }, { value: 'Tag 10', backgroundColor: '#009042' }] },
            ],
            body: { summary: 'New Task in To Do' },
            footer: [
              { type: 'avatar', label: 'Alice Brown', photo: 'https://picsum.photos/206' },
              { type: 'budget', label: 'Budget', value: '$150' },
              { type: 'timeFrame', label: 'Time Frame', value: '1.5 months' },
            ],
            borderColor: '#4784fc'
          },
        ],
        toggleColumn: true,
        action: {
          label: '+ Add task',
          event: ($event: any, column: any) => {
            console.log("Added new task action performed: ", column, $event);
          }
        }
      },
      {
        id: 2,
        heading: 'In Progress',
        tasks: [
          {
            id: 8,
            header: [
              {
                type: 'link', label: 'EP-8', event: ($event: any, column: any) => {
                  console.log("Added new experiment action performed: ", column, $event);
                }
              },
              { type: 'chip', value: [{ value: 'Tag 11', backgroundColor: 'blue' }] },
            ],
            body: { summary: 'New Task in Progress' },
            footer: [
              { type: 'avatar', label: 'Bob Smith', photo: 'https://picsum.photos/207' },
              { type: 'budget', label: 'Budget', value: '$250' },
              { type: 'timeFrame', label: 'Time Frame', value: '2.5 months' },
            ],
            borderColor: '#FFCA11'
          },
        ],
        toggleColumn: true,
      },
      {
        id: 3,
        heading: 'Done',
        tasks: [
          {
            id: 9,
            header: [
              {
                type: 'link', label: 'EP-9', event: ($event: any, column: any) => {
                  console.log("Added new experiment action performed: ", column, $event);
                }
              },
              { type: 'chip', value: [{ value: 'Tag 12', backgroundColor: 'red', foregroundColor: '#ffffff' }] },
            ],
            body: { summary: 'New Completed Task' },
            footer: [
              { type: 'avatar', label: 'Charlie Green', photo: 'https://picsum.photos/208' },
              { type: 'budget', label: 'Budget', value: '$350' },
              { type: 'timeFrame', label: 'Time Frame', value: '3.5 months' },
            ],
            borderColor: '#4784fc'
          },
        ],
        toggleColumn: true,
      }
    ]
  }
];

const workflowItems = [
  {
    "opportunity": {
      "id": 1,
      "header": [],
      "body": {
        // "contenteditable": true,
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

const tableHeaders = [{
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

export const Default: Story = {
  parameters: {
    docs: {
      summary: {
        story: 'This example illustrates the default functionalities of the Kanban component. You can drag and drop cards across different states of the Kanban board by default.',
      },
    },
  },
  args: {
    data: kanbanData
  },
};
export const Swimlane: Story = {
  parameters: {
    docs: {
      summary: {
        story: 'This example showcases the swimlane features of the Kanban component. The property panel allows you to sort cards, enable drag-and-drop across swimlanes, display or hide empty rows, view item counts, and manage swimlane frozen rows. Additionally, you can expand or collapse swimlane rows within the Kanban board.',
      },
    },
  },
  args: {
    data: kanbanDataWithSwimlanes,
    type: "swimlane"
  },
};
export const Workflow: Story = {
  parameters: {
    docs: {
      summary: {
        story: 'This example demonstrates the functionalities of a hierarchical structure with opportunities as root nodes, each having multiple solutions as children, and each solution further having multiple experiments. By interacting with the nodes, you can explore the relationships, revealing the hierarchy and flow.',
      },
    },
  },
  args: {
    data: workflowItems,
    tableHeaders,
    type: "workflow"
  },
};
