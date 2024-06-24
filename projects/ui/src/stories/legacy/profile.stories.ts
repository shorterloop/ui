// @ts-nocheck
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// List.stories.ts

import { ProfileComponent } from '../../lib/profile/profile.component';
import { ImageComponent } from '../../lib/image/image.component';
import { InputComponent } from '../../lib/input/input.component';
import { ErrorComponent } from '../../lib/error/error.component';

const meta: Meta<ProfileComponent> = {
  title: 'Components/Profile',
  component: ProfileComponent,
  tags: ['autodocs'],
  // subcomponents: { ImageComponent },
  decorators: [
    moduleMetadata({
      declarations: [ProfileComponent, ImageComponent, InputComponent, ErrorComponent],
      imports: [CommonModule],
    }),
  ]
};

export default meta;

export const Default: Story = (args) => ({
  props: args
});


