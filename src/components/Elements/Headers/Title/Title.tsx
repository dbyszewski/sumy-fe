import { ReactNode } from 'react';
import styled from 'styled-components';

interface TitleProps {
  children: ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  flex: 1;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.text.themeDark};
`;
