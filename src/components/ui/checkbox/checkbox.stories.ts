import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from './checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'normal', 'big'],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'normal',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Accept Terms and Conditions',
  },
};

export const DisabledWithLabel: Story = {
  args: {
    label: 'Accept Terms and Conditions',
    disabled: true,
  },
};
