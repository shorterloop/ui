// @ts-nocheck
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ExperimentEvaluateOutcomeComponent } from '../lib/experiment-evaluate-outcome/shorterloop-experiment-evaluate-outcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
const meta: Meta<ExperimentEvaluateOutcomeComponent> = {
  title: 'Components/Experiments',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  component: ExperimentEvaluateOutcomeComponent,
  tags: ['autodocs']
};
export default meta;
// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ExperimentEvaluateOutcomeComponent> = (args: ExperimentEvaluateOutcomeComponent) => ({
  props: args,
});

export const Default = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
Default.args = {
  imageSrc: '',
  editIcon: ''
};
