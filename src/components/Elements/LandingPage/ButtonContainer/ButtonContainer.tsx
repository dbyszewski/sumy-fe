import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default Layout;
