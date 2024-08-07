// @ts-nocheck
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ShorterloopSampleCalculatorComponent } from '../lib/shorterloop-sample-calculator/shorterloop-sample-calculator.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
const meta: Meta<ShorterloopSampleCalculatorComponent> = {
  title: 'Components/Calculator',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  component: ShorterloopSampleCalculatorComponent,
  tags: ['autodocs']
};
export default meta;
// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ShorterloopSampleCalculatorComponent> = (args: ShorterloopSampleCalculatorComponent) => ({
  props: args,
});

export const Default = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
Default.args = {
  populationSize: '',
  targetConfidence: ''
};
