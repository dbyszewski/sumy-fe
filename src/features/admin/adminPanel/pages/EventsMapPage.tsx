import styled from 'styled-components';

import { useEvents } from '@/api/events/get-events.ts';
import { AllEventsMap } from '@/features/admin/adminPanel/components/AllEventsMap.tsx';

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
    <MapContainer>
      <AllEventsMap events={eventsQuery.data} />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 70vh;
  width: 70vh;
  max-height: 700px;
  max-width: 700px;
`;
