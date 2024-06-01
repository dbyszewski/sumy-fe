import {
  faLocationDot,
  faGears,
  faMap,
  faUsers,
  faMapLocation,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { NavbarSection } from './NavbarSection';

import { Button } from '@/components/Elements/Button';
import { Header } from '@/components/Elements/Navigation/Header';
import { useAuth } from '@/hooks/useAuth.ts';

export const Navbar = () => {
  const { logOut, isAdmin } = useAuth();
  const [active, setActive] = useState(window.innerWidth > 768);
  const navigationItems = [
    {
      title: 'Moje konto',
      items: [
        {
          title: 'Moje zgłoszenia',
          href: '/user/events',
          icon: faMapLocation,
        },
        {
          title: 'Mapa zgłoszeń',
          href: '/user/map',
          icon: faMap,
        },
        {
          title: 'Ustawienia',
          href: '/user/settings',
          icon: faGears,
        },
      ],
    },
  ];

  if (isAdmin) {
    navigationItems.unshift({
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
      ],
    });
  }

  const handleLogOut = () => {
    logOut();
  };

  const toggleActive = () => {
    setActive(!active);
  };

  const navbarContainerVariants = {
    hidden: { x: '-16rem' },
    visible: { x: 0 },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setActive(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AnimatePresence initial={false}>
      <NavbarContainer>
        <Header toggleActive={toggleActive} />
        <StyledNavigation
          active={active}
          key={active ? 'active' : 'inactive'}
          variants={navbarContainerVariants}
          initial={active ? 'hidden' : 'visible'}
          animate={active ? 'visible' : 'hidden'}
          exit="hidden"
          transition={{ duration: 0.5, ease: 'easeInOut' }}>
          <div>
            {navigationItems.map(({ title, items }, index) => (
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
    </AnimatePresence>
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
  @media (max-width: 768px) {
    position: fixed;
    padding-top: 4rem;
    background-color: transparent;
    box-shadow: none;
    height: 0;
  }
`;

const StyledNavigation = styled(motion.nav)<{ active: boolean }>`
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
  @media (max-width: 768px) {
    background-color: ${({ theme }) => theme.colors.navigation.light};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    height: calc(100vh - 4rem);
  }
`;

const LogOutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
