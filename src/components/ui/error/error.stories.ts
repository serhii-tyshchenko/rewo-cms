import type { Meta, StoryObj } from '@storybook/react-vite';

import Error from './error';

const meta = {
  title: 'UI/Error',
  component: Error,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'normal', 'big'],
    },
  },
} satisfies Meta<typeof Error>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an error message.',
    className: '',
    size: 'normal',
  },
};

export const Small: Story = {
  args: {
    children: 'This is a small error message.',
    size: 'small',
  },
};

export const Big: Story = {
  args: {
    children: 'This is a big error message.',
    size: 'big',
  },
};
