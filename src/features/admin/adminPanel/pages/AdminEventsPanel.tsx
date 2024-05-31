import styled from 'styled-components';

import { AdminEventsTable } from '../components/EventsTab/AdminEventsTable';

import { Title } from '@/components/Elements/Headers/Title';
import { Divider } from '@/components/Elements/LandingPage/Divider';

export const AdminEventsPanel = () => {
  return (
    <Container>
      <Title>Zgłoszenia oczekujące</Title>
      <AdminEventsTable maxRows={5} filter={{ status: ['pending'] }} />
      <Divider />
      <Title>Wszystkie zgłoszenia</Title>
      <AdminEventsTable maxRows={10} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
