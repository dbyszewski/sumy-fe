import { AdvancedMarker, APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';

import Nullable from '@/types/nullable.ts';

type Position = {
  lat: number;
  lng: number;
};

type EventMapProps = {
  position: Nullable<Position>;
};

export const AdminEventMap = ({ position }: EventMapProps) => {
  if (!position) {
    //TODO: add spinner
    return <div>Wczytywanie...</div>;
  }

  const marker = {
    position,
    draggable: false, // Ustawienie draggable na false
  };

  return (
    <APIProvider apiKey={'AIzaSyD-vIAZx7ywuyHukcLw2qZlgm8CRceTOsc'}>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={position}
        clickableIcons={false}
        disableDefaultUI={true}
        zoomControl={true}
        mapId="report-map">
        <AdvancedMarker {...marker} />
      </GoogleMap>
    </APIProvider>
  );
};
