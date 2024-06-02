import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';
import { UserEventsTable } from '@/features/user/userPanel/components/EventsTab/UserEventsTable';
import { useAuth } from '@/hooks/useAuth.ts';

export const UserEventsPanel = () => {
  const filterUserID = Number(useAuth().userID);
  return (
    <Container>
      <Title>Moje zgłoszenia</Title>
      <UserEventsTable maxRows={10} filter={{ userID: filterUserID }} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
