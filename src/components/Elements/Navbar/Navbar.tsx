import { faHouseChimney, faGears, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { NavbarItem } from './NavbarItem';

const MOCK_NAV_DATA = [
  {
    title: 'Zgłoszenia',
    href: '/admin/events',
    icon: faHouseChimney,
  },
  {
    title: 'Użytkownicy',
    href: '/admin/users',
    icon: faUser,
  },
  {
    title: 'Mapa zgłoszeń',
    href: '/admin/map',
    icon: faGears,
  },
];

export const Navbar = () => {
  return (
    <NavbarContainer>
      <StyledNavigation>
        {MOCK_NAV_DATA.map(({ title, href, icon }, index) => (
          <NavbarItem title={title} href={href} icon={icon} key={index} />
        ))}
      </StyledNavigation>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  top: 0;
  z-index: 40;
  width: 16rem;
  padding: 4rem 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.elements.light};
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
`;
