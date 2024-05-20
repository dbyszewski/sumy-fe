import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Footer } from '@/components/Elements/Footer';
import { Header } from '@/components/Elements/Header';
import { Navbar } from '@/components/Elements/Navbar';

export const Layout = () => {
  return (
    <Container>
      <Header />
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
  margin-left: 16rem;
  margin-top: 4rem;
  flex: 1 1 0;
  overflow-y: auto;
  padding: 1rem;
`;
