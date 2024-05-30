import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Card } from '@/components/Elements/Card';

export const Layout = () => {
  return (
    <Container>
      <Card title="Zgłoszenie">
        <Outlet />
      </Card>
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
