import { faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/components/Elements/LandingPage/Logo/Logo.tsx';

export const Header = () => {
  return (
    <HeaderContainer>
      <StyledLink to={'/'}>
        <Logo />
        <h1>112 - panel administratora</h1>
      </StyledLink>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: sticky;
  height: 4rem;
  top: 0;
  z-index: 50;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.elements.dark};
`;

const StyledLink = styled(Link)`
  height: 100%;
  display: flex;
  gap: 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.light};
  align-items: center;
  margin-left: 2rem;
`;
