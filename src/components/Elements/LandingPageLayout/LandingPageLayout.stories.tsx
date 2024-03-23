import { Meta, StoryObj } from '@storybook/react';

import LandingPageLayout from './LandingPageLayout.tsx';

const meta = {
  title: 'Components/Elements/LandingPageLayout',
  component: LandingPageLayout,
} satisfies Meta<typeof LandingPageLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Standard: Story = {};
