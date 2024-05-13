import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Layout = () => {
  return (
    <Container>
      <Title>Panel Administratora</Title>
      <Outlet />
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

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  margin-bottom: 2rem;
`;
