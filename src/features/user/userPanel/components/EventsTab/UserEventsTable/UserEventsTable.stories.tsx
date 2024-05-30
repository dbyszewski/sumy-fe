import { Meta, StoryObj } from '@storybook/react';

import { UserEventsTable } from '@/features/user/userPanel/components/EventsTab/UserEventsTable/UserEventsTable.tsx';

const meta = {
  title: 'Components/ELements/UserEventsTable',
  component: UserEventsTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserEventsTable>;
export default meta;

type TableStory = StoryObj<typeof UserEventsTable>;
export const Standard: TableStory = {};
