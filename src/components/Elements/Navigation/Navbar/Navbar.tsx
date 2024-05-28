import {
  faLocationDot,
  faGears,
  faMap,
  faUser,
  faMapLocation,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { Header } from '@/components/Elements/Header';
import { NavbarSection } from '@/components/Elements/Navbar/NavbarSection.tsx';

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
        icon: faUser,
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
          <LogOutButton>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Wyloguj się
          </LogOutButton>
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

const LogOutButton = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.navigation.dark};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  border: 1px solid transparent;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.navigation.darkRed};
  }
`;
