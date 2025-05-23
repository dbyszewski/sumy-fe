import { Position } from '@/api/events/types';
import { MapPicker } from '@/features/report/components/MapPicker';

export const LocationSelect = () => {
  const initialPosition = localStorage.getItem('reportLocation');
  if (!initialPosition) {
    return <MapPicker />;
  }
  return <MapPicker initialPosition={JSON.parse(initialPosition) as Position} />;
};
