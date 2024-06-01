import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/components/Elements/LandingPage/Logo/Logo.tsx';

interface HeaderProps {
  toggleActive: () => void;
}

export const Header = ({ toggleActive }: HeaderProps) => {
  return (
    <HeaderContainer>
      <StyledIcon icon={faBars} onClick={toggleActive} />
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
  display: flex;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.navigation.darkRed};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 1rem 0;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    gap: 0;
    padding: 1rem;
    border-radius: 0;
  }
  color: ${({ theme }) => theme.colors.text.light};
  align-items: center;
  flex-wrap: nowrap;
`;

const StyledLink = styled(Link)`
  height: 100%;
  align-items: center;
  display: flex;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.light};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  @media (min-width: 768px) {
    display: none;
  }
`;
