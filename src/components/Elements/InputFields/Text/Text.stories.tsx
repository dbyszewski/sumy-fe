import { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './Text';

const meta = {
  title: 'Components/Elements/InputFields/Text',
  component: TextInput,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'text',
    id: 'test',
    size: 'md',
    label: 'Test',
    children: 'Button',
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    error: 'This is an error',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
  },
};
