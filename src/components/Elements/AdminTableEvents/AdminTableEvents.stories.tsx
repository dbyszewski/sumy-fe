import { Meta, StoryObj } from '@storybook/react';

import { AdminTableEvents } from './AdminTableEvents.tsx';

const meta = {
  title: 'Components/ELements/AdminTableEvents',
  component: AdminTableEvents,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminTableEvents>;
export default meta;

type TableStory = StoryObj<typeof AdminTableEvents>;
export const Standard: TableStory = {};
