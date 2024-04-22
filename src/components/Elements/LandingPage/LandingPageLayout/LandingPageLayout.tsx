import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <Container>
      <LayoutStyled>{children}</LayoutStyled>
    </Container>
  );
};

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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
