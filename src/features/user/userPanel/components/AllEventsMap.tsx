import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import styled from 'styled-components';

import { Event } from '@/api/events/types.ts';
import { getStatusMappedName } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import Nullable from '@/types/nullable.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';

type Position = {
  lat: number;
  lng: number;
};

type EventsMapProps = {
  events: Event[];
  currentPosition: Nullable<Position>;
};

export const AllEventsMap = ({ events, currentPosition }: EventsMapProps) => {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const handleMarkerClick = (clickedEvent: Event) => {
    const overlappingEvents = events.filter(
      (event) =>
        event.latitude === clickedEvent.latitude && event.longitude === clickedEvent.longitude
    );
    setSelectedEvents(overlappingEvents);
  };

  if (!currentPosition) {
    //TODO: add spinner
    return <div>Wczytywanie...</div>;
  }

  return (
    <APIProvider apiKey={'AIzaSyD-vIAZx7ywuyHukcLw2qZlgm8CRceTOsc'}>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={currentPosition}
        clickableIcons={false}
        disableDefaultUI={true}
        zoomControl={true}
        mapId="events-map">
        {events.map((event) => (
          <AdvancedMarker
            key={event.eventID}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => handleMarkerClick(event)}
          />
        ))}
        {selectedEvents.length > 0 && (
          <InfoWindow
            position={{ lat: selectedEvents[0].latitude, lng: selectedEvents[0].longitude }}
            onCloseClick={() => setSelectedEvents([])}>
            <InfoWindowContent>
              {selectedEvents.map((event) => (
                <div key={event.eventID}>
                  <h3>{`Zgłoszenie - [${event.eventID}] ${event.title}`}</h3>
                  <p>
                    <strong>Opis:</strong> {event.description}
                  </p>
                  <p>
                    <strong>Numer telefonu:</strong> {event.phone}
                  </p>
                  <p>
                    <strong>Data zdarzenia:</strong> {formatDateTime(event.eventDate)}
                  </p>
                  <p>
                    <strong>Data zgłoszenia:</strong> {formatDateTime(event.reportDate)}
                  </p>
                  <p>
                    <strong>Status:</strong> {getStatusMappedName(event.status)}
                  </p>
                  <hr />
                </div>
              ))}
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
  color: black;
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
  hr {
    border: 1px solid #999;
    margin: 10px 0;
  }
`;
