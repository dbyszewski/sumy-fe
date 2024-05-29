import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';
import { SingleEventMap } from '@/features/admin/adminPanel/components/SingleEventMap.tsx';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import { axios } from '@/lib/axios.ts';
import nullable from '@/types/nullable.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderVisibility } from '@/utils/tableHelper';

interface Event {
  eventID: number;
  phone: string;
  title: string;
  description: string;
  eventDate: string;
  reportDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  visibility: boolean;
  longitude: number;
  latitude: number;
}

export const EventDetailsCard = () => {
  const [event, setEvent] = useState<nullable<Event>>(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data.result as Event);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleBackButtonClick = useCallback(() => {
    window.history.back();
  }, []);

  if (!event) {
    return null;
  }

  return (
    <Content>
      <Header>
        <BackButton onClick={handleBackButtonClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <Title>Szczegóły zdarzenia</Title>
      </Header>
      <RowsContainer>
        <Row>
          <ColumnLeft>Tytuł:</ColumnLeft>
          <ColumnRight>{event.title}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Opis:</ColumnLeft>
          <ColumnRight>{event.description}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Numer telefonu:</ColumnLeft>
          <ColumnRight>{event.phone}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Data zdarzenia:</ColumnLeft>
          <ColumnRight>{formatDateTime(event.eventDate)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Data zgłoszenia:</ColumnLeft>
          <ColumnRight>{formatDateTime(event.reportDate)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Status:</ColumnLeft>
          <ColumnRight>
            <StatusIconWithTooltip status={event.status} colored />
          </ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Widoczność:</ColumnLeft>
          <ColumnRight>{renderVisibility(event.visibility)}</ColumnRight>
        </Row>
        <MapContainer>
          <SingleEventMap position={{ lat: event.latitude, lng: event.longitude }} />
        </MapContainer>
      </RowsContainer>
    </Content>
  );
};

const Content = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.elements.brightLight};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  overflow: hidden;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.themeDark};
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.elements.light};
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.elements.light};
  gap: 0.5rem;
  word-break: break-word;
  height: auto;
  padding: 0.5rem 0;
`;

const ColumnLeft = styled.div`
  font-weight: bold;
  flex: 0 0 150px;
  text-align: end;
  padding-right: 0.5rem;
`;

const ColumnRight = styled.div`
  flex: 1;
  align-self: flex-end;
`;

const MapContainer = styled.div`
  height: 20rem;
  background: #e5e5e5;
  margin-top: 3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
`;
