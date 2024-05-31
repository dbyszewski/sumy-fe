import styled from 'styled-components';

import { useEvents } from '@/api/events/get-events.ts';
import { Title } from '@/components/Elements/Headers/Title';
import { AllEventsMap } from '@/features/user/userPanel/components/AllEventsMap.tsx';

export const EventsMapPage = () => {
  const eventsQuery = useEvents();

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
        <AllEventsMap events={eventsQuery.data} />
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
