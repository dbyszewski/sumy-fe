import { AdvancedMarker, APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';

import Nullable from '@/types/nullable.ts';

type Position = {
  lat: number;
  lng: number;
};

type MapProps = {
  currentPosition: Nullable<Position>;
  setCurrentPosition: (position: Nullable<Position>) => void;
};

export const Map = ({ currentPosition, setCurrentPosition }: MapProps) => {
  const handleLocationChange = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) {
      return;
    }
    setCurrentPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  if (!currentPosition) {
    //TODO: add spinner
    return <div>Wczytywanie...</div>;
  }

  const marker = {
    position: currentPosition,
    draggable: true,
    onDragEnd: handleLocationChange,
  };

  return (
    <APIProvider apiKey={'AIzaSyD-vIAZx7ywuyHukcLw2qZlgm8CRceTOsc'}>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={currentPosition}
        clickableIcons={false}
        disableDefaultUI={true}
        zoomControl={true}
        mapId="report-map">
        <AdvancedMarker {...marker} />
      </GoogleMap>
    </APIProvider>
  );
};
