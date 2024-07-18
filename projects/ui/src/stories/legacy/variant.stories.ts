// @ts-nocheck
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular';
import { VariantComponent } from '../../lib/variant/variant.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
const meta: Meta<VariantComponent> = {
  title: 'Components/Variant',
  component: VariantComponent,
  tags: ['autodocs']
};
export default meta;
// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<VariantComponent> = (args: VariantComponent) => ({
  props: args,
});

export const Default = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
Default.args = {
  imageSrc: '',
  editIcon: ''
};

