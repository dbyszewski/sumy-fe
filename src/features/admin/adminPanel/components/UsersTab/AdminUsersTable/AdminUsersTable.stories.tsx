import { Meta, StoryObj } from '@storybook/react';

import { AdminUsersTable } from './AdminUsersTable.tsx';

const meta = {
  title: 'Components/ELements/AdminUsersTable',
  component: AdminUsersTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminUsersTable>;
export default meta;

type TableStory = StoryObj<typeof AdminUsersTable>;
export const Standard: TableStory = {};
