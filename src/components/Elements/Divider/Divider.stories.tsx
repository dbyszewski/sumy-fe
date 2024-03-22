import { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta = {
  title: 'Components/Elements/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
