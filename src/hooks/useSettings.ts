import { useContext } from 'react';

import { SettingsContext } from '@/providers/SettingsProvider.tsx';

export const useSettings = () => {
  return useContext(SettingsContext);
};
