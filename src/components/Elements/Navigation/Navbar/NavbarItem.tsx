import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export interface NavbarItemProps {
  title: string;
  href: string;
  icon: IconDefinition;
  active?: boolean;
}

export const NavbarItem = ({ title, href, icon }: NavbarItemProps) => {
  const isActive = window.location.pathname.includes(href);
  return (
    <StyledLink to={href} active={isActive}>
      <FontAwesomeIcon icon={icon} />
      {title}
    </StyledLink>
  );
};

const StyledLink = styled(Link)<{ active?: boolean }>`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  text-wrap: nowrap;
  align-items: center;
  padding: 0.75rem;
  line-height: 1.25;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.text.dark};

  &:hover {
    background: ${({ theme }) => theme.colors.navigation.button.hover};
    color: ${({ theme }) => theme.colors.text.themeDark};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.colors.navigation.button.active};
      color: ${theme.colors.text.themeDark};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    `}
`;
