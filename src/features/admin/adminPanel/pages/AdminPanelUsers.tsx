import styled from 'styled-components';

import { AdminUsersTable } from '../components/UsersTab/AdminUsersTable';

import { Title } from '@/components/Elements/Headers/Title';
export const AdminPanelUsers = () => {
  return (
    <Container>
      <Title>Wszyscy użytkownicy</Title>
      <AdminUsersTable />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
