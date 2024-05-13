import { Meta, StoryObj } from '@storybook/react';

import { AdminTable } from './AdminTable.tsx';

const meta = {
  title: 'Components/ELements/AdminTable',
  component: AdminTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AdminTable>;
export default meta;

type TableStory = StoryObj<typeof AdminTable>;
export const Standard: TableStory = {};
