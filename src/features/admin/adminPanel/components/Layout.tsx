import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Layout = () => {
  return (
    <Container>
      <AdminCard>
        <Title>Panel Administratora</Title>
        <Outlet />
      </AdminCard>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AdminCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  margin-bottom: 2rem;
`;
