import React from 'react';
import styled from 'styled-components';
import { Footer } from '@/components/Elements/Footer';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
    <Container>
      <LayoutStyled>{children}</LayoutStyled>
    </Container>
    <Footer />
    </>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;
export default Layout;
