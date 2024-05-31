import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

import { useEvents } from '@/api/events/get-events.ts';
import { Position } from '@/api/events/types.ts';
import { Title } from '@/components/Elements/Headers/Title';
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { AllEventsMap } from '@/features/user/userPanel/components/AllEventsMap.tsx';
import Nullable from '@/types/nullable.ts';
import { getGeolocation } from '@/utils/geoHelper.tsx';

export const EventsMapPanel = () => {
  const eventsQuery = useEvents();
  const [currentPosition, setCurrentPosition] = useState<Nullable<Position>>(null);

  useLayoutEffect(() => {
    getGeolocation().then((position) => {
      setCurrentPosition(position);
    });
  }, []);

  if (eventsQuery.isLoading) {
    return <LoadingSpinner />;
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
        {currentPosition && (
          <AllEventsMap events={eventsQuery.data} currentPosition={currentPosition} />
        )}
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
