import { Meta, StoryObj } from '@storybook/react';

import { AdminEventsTable } from './AdminEventsTable.tsx';

const meta = {
  title: 'Components/ELements/AdminEventsTable',
  component: AdminEventsTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminEventsTable>;
export default meta;

type TableStory = StoryObj<typeof AdminEventsTable>;
export const Standard: TableStory = {};
