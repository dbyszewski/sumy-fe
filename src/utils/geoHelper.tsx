import { Position } from '@/api/events/types.ts';

const defaultPosition: Position = {
  lat: 19.45402886180793,
  lng: 51.747357800785984,
};

export const getGeolocation = (): Promise<Position> => {
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          resolve(defaultPosition);
        }
      );
    } else {
      resolve(defaultPosition);
    }
  });
};
