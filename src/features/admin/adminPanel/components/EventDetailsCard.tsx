import styled from 'styled-components';

import { AdminEventMap } from '@/features/admin/adminPanel/components/AdminEventMap.tsx';
import { EventCard } from '@/features/admin/adminPanel/components/EventCard.tsx';
import { formatDateTime } from '@/utils/dateHelper.ts';

export const EventDetailsCard = ({ event, onClose }) => {
  return (
    <EventCard
      title={`Zgłoszenie - [${event.eventID}] ${event.title && event.title.length > 30 ? `${event.title.substring(0, 30)}...` : event.title}`}
      onClose={onClose}>
      <ScrollContainer>
        <Row>
          <ColumnLeft>
            <strong>Tytuł:</strong>
          </ColumnLeft>
          <ColumnRight>{event.title}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>
            <strong>Opis:</strong>
          </ColumnLeft>
          <ColumnRight>{event.description}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>
            <strong>Nazwa użytkownika:</strong>
          </ColumnLeft>
          <ColumnRight>{event.userName}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>
            <strong>Numer telefonu:</strong>
          </ColumnLeft>
          <ColumnRight>{event.phone}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>
            <strong>Data zdarzenia:</strong>
          </ColumnLeft>
          <ColumnRight>{formatDateTime(event.eventDate)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>
            <strong>Data zgłoszenia:</strong>
          </ColumnLeft>
          <ColumnRight>{formatDateTime(event.reportDate)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>
            <strong>Status:</strong>
          </ColumnLeft>
          <ColumnRight>{event.status}</ColumnRight>
        </Row>
        <MapContainer>
          <AdminEventMap position={{ lat: event.latitude, lng: event.longitude }} />
        </MapContainer>
      </ScrollContainer>
    </EventCard>
  );
};

const MapContainer = styled.div`
  height: 250px;
  width: 100%;
  background: #e5e5e5;
  border-radius: 10px;
  margin-top: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const ColumnLeft = styled.div`
  text-align: right;
  width: 22%;
  padding-right: 10px;
  font-weight: bold;
`;

const ColumnRight = styled.div`
  text-align: left;
  width: 78%;
`;

const ScrollContainer = styled.div`
  height: 87%;
  overflow-y: auto;
`;
