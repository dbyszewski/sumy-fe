import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { useEvents } from '@/api/events/get-events.ts';
import { Title } from '@/components/Elements/Headers/Title';
import { AllEventsMap } from '@/features/user/userPanel/components/AllEventsMap.tsx';
import Nullable from '@/types/nullable.ts';

type Position = {
  lat: number;
  lng: number;
};

export const EventsMapPanel = () => {
  const eventsQuery = useEvents();
  const [currentPosition, setCurrentPosition] = useState<Nullable<Position>>(null);

  useLayoutEffect(() => {
    if ('geolocation' in navigator && !currentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => {
          console.error(error);
          setCurrentPosition({
            lng: 51.747357800785984,
            lat: 19.45402886180793,
          });
        }
      );
    } else {
      setCurrentPosition({
        lng: 51.747357800785984,
        lat: 19.45402886180793,
      });
    }
  }, []);

  if (eventsQuery.isLoading) {
    return <div>Ładowanie danych...</div>;
  }

  if (eventsQuery.isError) {
    return <div>Wystąpił błąd podczas ładowania danych</div>;
  }

  if (!eventsQuery.data) {
    return <div>Brak danych</div>;
  }

  return (
    <Container>
      <Title>Mapa zgłoszeń</Title>
      <MapContainer>
        <AllEventsMap events={eventsQuery.data} currentPosition={currentPosition} />
      </MapContainer>
    </Container>
  );
};

const MapContainer = styled.div`
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;
