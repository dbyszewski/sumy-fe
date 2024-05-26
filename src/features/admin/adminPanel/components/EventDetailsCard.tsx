import styled from 'styled-components';

import { AdminEventMap } from '@/features/admin/adminPanel/components/AdminEventMap.tsx';
import { EventCard } from '@/features/admin/adminPanel/components/EventCard.tsx';
import { formatDateTime } from '@/utils/dateHelper.ts';

export const EventDetailsCard = ({ event, onClose }) => {
  return (
    <EventCard
      title={`Zgłoszenie - [${event.id}] ${event.title && event.title.length > 30 ? `${event.title.substring(0, 30)}...` : event.title}`}
      onClose={onClose}>
      <p>
        <strong>Tytuł:</strong> {event.title}
      </p>
      <p>
        <strong>Opis:</strong> {event.description}
      </p>

      <p>
        <strong>Nazwa użytkownika:</strong> {event.userName}
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
        <strong>Status:</strong> {event.status}
      </p>
      <MapContainer>
        <AdminEventMap position={{ lat: event.latitude, lng: event.longitude }} />
      </MapContainer>
    </EventCard>
  );
};

const MapContainer = styled.div`
  height: 300px;
  background: #e5e5e5;
  border-radius: 10px;
  margin-top: 20px;
`;
