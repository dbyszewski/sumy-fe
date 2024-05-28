import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer } from '@/components/Elements/Footer';
import { Navbar } from '@/components/Elements/Navbar';

export const Layout = () => {
  return (
    <Container>
      <InterContainer>
        <Navbar />
        <MainComponent>
          <Outlet />
        </MainComponent>
      </InterContainer>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const InterContainer = styled.div`
  display: flex;
  flex: 1 1 0;
`;

const MainComponent = styled.main`
  overflow-y: auto;
  padding: 2rem;
`;
