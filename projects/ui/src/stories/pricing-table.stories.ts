// @ts-nocheck
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { SampleSizeCalculator } from '../lib/form-field/form-field.component';
import { PricingComponent } from '../public-api';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
const meta: Meta<SampleSizeCalculator> = {
  title: 'Components/Pricing Table',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  component: PricingComponent,
  tags: ['autodocs']
};
export default meta;
// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<PricingComponent> = (args: SampleSizeCalculator) => ({
  props: args,
});

export const Default = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
Default.args = {
};
