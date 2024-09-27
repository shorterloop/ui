import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet } from '@angular/router';
import { EvaluateExperimentVariantsComponent } from "../../projects/ui/src/lib/evaluate-experiment-variants/evaluate-experiment-variants.component";
import { KanbanComponent, SampleSizeCalculator } from '../../projects/ui/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSelectModule, MatIconModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, KanbanComponent, SampleSizeCalculator, EvaluateExperimentVariantsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  calculatorForm: FormGroup;
  criteriaForm: FormGroup;

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

  variants = [{
    id: 1,
    variantName: 'Vaibhav',
    sampleSize: 160000,
    result: 90000,
    resultSymbol: '#',
    winningStatus: true
  }, {
    id: 2,
    variantName: 'Vaibhav2',
    sampleSize: 130000,
    result: 10,
    resultSymbol: '%',
    winningStatus: false
  }, {
    id: 3,
    variantName: 'Vaibhav3',
    sampleSize: 190000,
    result: 25,
    resultSymbol: '%',
    winningStatus: false
  }, {
    id: 4,
    variantName: 'Vaibhav4',
    sampleSize: 170000,
    result: 30,
    resultSymbol: '%',
    winningStatus: false
  }]

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
  kanbanData = [
    {
      "id": 1,
      "heading": "To-do",
      "tasks": [
        {
          "id": 1,
          "header": [],
          "body": {
            "summary": "Improve Experience",
            "action": {}
          },
          "footer": [],
          "borderColor": " #4784FC"
        },
        {
          "id": 2,
          "header": [],
          "body": {
            "summary": " Dependencies",
            "action": {}
          },
          "footer": [],
          "borderColor": " #4784FC"
        }
      ],
      "action": [{
        "label": "+ Add Solution",
        "action": {
          event: ($event: any, column: any) => {
            console.log("Added new experiment action performed: ", column, $event);
          }
        }
      }, {
        "label": "+ Add Work",
        "action": {
          event: ($event: any, column: any) => {
            console.log("Added new experiment action performed: ", column, $event);
          }
        }
      }]
    },
    {
      "id": 2,
      "heading": "In-progress",
      "tasks": [
        {
          "id": 1,
          "header": [],
          "body": {
            "summary": "Experience",
            "action": {}
          },
          "footer": [],
          "borderColor": " #4784FC"
        },
        {
          "id": 2,
          "header": [],
          "body": {
            "summary": "Implement Task",
            "action": {}
          },
          "footer": [],
          "borderColor": " #4784FC"
        }
      ],
      "action": {
        "label": "+ Add Solution",
        "action": {
          event: ($event: any, column: any) => {
            console.log("Added new experiment action performed: ", column, $event);
          }
        }
      }
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
    }]
  workflowItems = [
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
          "action": {
            event: ($event: any, column: any) => {
              console.log("Added new experiment action performed: ", column, $event);
            }
          }
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
          "action": {
            event: ($event: any, column: any) => {
              console.log("Added new experiment action performed: ", column, $event);
            }
          },
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
    ,
    {
      "opportunity": {
        "id": -1,
        "header": [],
        "body": {
          "summary": "",
          "contenteditable": true
        },
        "footer": [],
        "borderColor": "#4784fc"
      },
      "solutions": []
    },
    {
      "opportunity": {},
      "solutions": [{
        solution: {
          "id": -1,
          "header": [],
          "body": {
            "summary": "",
            "contenteditable": true
          },
          "footer": [],
          "borderColor": "#4784fc"
        }
      }]
    },
    {
      "opportunity": {},
      "solutions": [{
        solution: {},
        experiments: [{
          "id": -1,
          "header": [],
          "body": {
            "summary": "",
            "contenteditable": true
          },
          "footer": [],
          "borderColor": "#4784fc"
        }]
      }]
    }
    ,
    {
      "opportunity": {},
      "solutions": [{
        solution: {},
        experiments: [{
          "id": -1,
          "header": [],
          "body": {
            "summary": "",
            "contenteditable": true
          },
          "footer": [],
          "borderColor": "#4784fc"
        }]
      }]
    },
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
        "borderColor": "#4784fc"
      },
      "solutions": [{
        solution: {},
        experiments: [{
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
          "borderColor": "#4784fc"
        }]
      }]
    },
  ]


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
    this.criteriaForm = this.fb.group({
      goal: ['HIGHEST_RESULT'],
      function: ['automatic'],
      threshold: [30],
      variants: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.setVariants(this.variants);
  }

  get variantsFormArray(): FormArray {
    return this.criteriaForm.get('variants') as FormArray;
  }

  setVariants(variants: any[]): void {
    const variantsFGs = variants.map(variant => this.fb.group(variant));
    const variantsFormArray = this.fb.array(variantsFGs);
    this.criteriaForm.setControl('variants', variantsFormArray);
  }

  addVariant(): void {
    this.variantsFormArray.push(this.fb.group({
      id: [''],
      variantName: [''],
      sampleSize: [''],
      result: [''],
      resultSymbol: ['#'],
      winningStatus: [Boolean]
    }));
  }

  onWinnerVariantFound(winnerVariant: any) {

    this.variantsFormArray.controls.forEach((control) => {
      // Check if the variantKey matches
      const isMatch = control.get('id')?.value === winnerVariant.winner?.id;

      // Update the 'winningStatus' FormControl to true if it matches, otherwise false
      control.get('winningStatus')?.setValue(isMatch);
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
