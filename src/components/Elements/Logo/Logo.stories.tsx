import { Meta, StoryObj } from '@storybook/react';

import Logo from './Logo';

const meta = {
  title: 'Components/Elements/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
