import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AllEventsMap } from '@/features/admin/adminPanel/components/AllEventsMap.tsx';
import { axios } from '@/lib/axios.ts';

export const EventsMapPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        const eventsData = response.data.result;
        setEvents(eventsData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <MapContainer>
      <AllEventsMap events={events} />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 70vh;
  width: 70vh;
  max-height: 700px;
  max-width: 700px;
`;
