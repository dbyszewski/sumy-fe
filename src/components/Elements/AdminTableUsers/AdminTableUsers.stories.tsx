import { Meta, StoryObj } from '@storybook/react';

import { AdminTableUsers } from './AdminTableUsers.tsx';

const meta = {
  title: 'Components/ELements/AdminTableUsers',
  component: AdminTableUsers,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminTableUsers>;
export default meta;

type TableStory = StoryObj<typeof AdminTableUsers>;
export const Standard: TableStory = {};
