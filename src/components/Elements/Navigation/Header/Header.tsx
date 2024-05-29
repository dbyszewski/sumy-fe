import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/components/Elements/LandingPage/Logo/Logo.tsx';

export const Header = () => {
  return (
    <HeaderContainer>
      <StyledLink to={'/'}>
        <Logo />
        <Title>SafelyAround</Title>
      </StyledLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  height: 4rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navigation.darkRed};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 1rem 0;
`;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.text.light};
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.light};
`;
