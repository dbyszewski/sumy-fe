import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';
import { UserEventsTable } from '@/features/user/userPanel/components/EventsTab/UserEventsTable';

export const UserEventsPanel = () => {
  return (
    <Container>
      <Title>Moje zgłoszenia</Title>
      <UserEventsTable />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
