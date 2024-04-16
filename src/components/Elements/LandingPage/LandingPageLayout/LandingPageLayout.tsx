import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <LayoutStyled>{children}</LayoutStyled>;
};

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 20px;
`;
export default Layout;
