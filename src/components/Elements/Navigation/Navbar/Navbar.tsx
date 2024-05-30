import {
  faLocationDot,
  faGears,
  faMap,
  faUsers,
  faMapLocation,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { NavbarSection } from './NavbarSection';

import { Button } from '@/components/Elements/Button';
import { Header } from '@/components/Elements/Navigation/Header';
import { useAuth } from '@/hooks/useAuth.ts';

const MOCK_NAV_DATA = [
  {
    title: 'Narzędzia Administracyjne',
    items: [
      {
        title: 'Zgłoszenia',
        href: '/admin/events',
        icon: faLocationDot,
      },
      {
        title: 'Użytkownicy',
        href: '/admin/users',
        icon: faUsers,
      },
      {
        title: 'Mapa zgłoszeń',
        href: '/admin/map',
        icon: faMap,
      },
    ],
  },
  {
    title: 'Moje konto',
    items: [
      {
        title: 'Moje zgłoszenia',
        href: '/user/events',
        icon: faMapLocation,
      },
      {
        title: 'Ustawienia',
        href: '/user/settings',
        icon: faGears,
      },
    ],
  },
];

export const Navbar = () => {
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <NavbarContainer>
      <Header />
      <StyledNavigation>
        <div>
          {MOCK_NAV_DATA.map(({ title, items }, index) => (
            <NavbarSection title={title} items={items} key={index} />
          ))}
        </div>

        <LogOutContainer>
          <Button onClick={handleLogOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Wyloguj się
          </Button>
        </LogOutContainer>
      </StyledNavigation>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  height: 100%;
  z-index: 40;
  width: 16rem;
  background-color: ${({ theme }) => theme.colors.navigation.light};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const StyledNavigation = styled.nav`
  min-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  flex: 1 1 0;
  justify-content: space-between;
`;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
