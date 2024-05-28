import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import styled from 'styled-components';

import { getStatusMappedName } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import Nullable from '@/types/nullable.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';

type Event = {
  eventID: number;
  title: string;
  description: string;
  userName: string;
  phone: string;
  latitude: number;
  longitude: number;
  eventDate: string;
  reportDate: string;
  status: string;
};

type EventsMapProps = {
  events: Event[];
};

export const AllEventsMap = ({ events }: EventsMapProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Nullable<Event>>(null);

  const LodzCoordinates = { lat: 51.7592, lng: 19.456 };

  return (
    <APIProvider apiKey={'AIzaSyD-vIAZx7ywuyHukcLw2qZlgm8CRceTOsc'}>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={LodzCoordinates}
        clickableIcons={false}
        disableDefaultUI={true}
        zoomControl={true}
        mapId="events-map">
        {events.map((event) => (
          <AdvancedMarker
            key={event.eventID}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
        {selectedEvent && (
          <InfoWindow
            position={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }}
            onCloseClick={() => setSelectedEvent(null)}>
            <InfoWindowContent>
              <h3>{`Zgłoszenie - [${selectedEvent.eventID}] ${selectedEvent.title}`}</h3>
              <p>
                <strong>Opis:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Nazwa użytkownika:</strong> {selectedEvent.userName}
              </p>
              <p>
                <strong>Numer telefonu:</strong> {selectedEvent.phone}
              </p>
              <p>
                <strong>Data zdarzenia:</strong> {formatDateTime(selectedEvent.eventDate)}
              </p>
              <p>
                <strong>Data zgłoszenia:</strong> {formatDateTime(selectedEvent.reportDate)}
              </p>
              <p>
                <strong>Status:</strong> {getStatusMappedName(selectedEvent.status)}
              </p>
            </InfoWindowContent>
          </InfoWindow>
        )}
      </GoogleMap>
    </APIProvider>
  );
};

const InfoWindowContent = styled.div`
  max-width: 500px;
  white-space: pre-wrap; 
  word-wrap: break-word; 

  h3 {
    margin: 0;
    text-align: center;
    font-size: 1.3rem;
  }

  p {
    margin: 5px 0;
  }

  strong {
    font-weight: bold;
  }

\` ;
`;
