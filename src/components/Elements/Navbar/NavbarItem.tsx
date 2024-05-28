import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarItem = ({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: IconDefinition;
}) => {
  return (
    <StyledLink to={href}>
      <FontAwesomeIcon icon={icon} />
      {title}
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  text-wrap: nowrap;
  align-items: center;
  padding: 0.75rem;
  text-align: start;
  line-height: 1.25;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  background: none;
  color: ${({ theme }) => theme.colors.text.light};
  &:hover {
    background: ${({ theme }) => theme.colors.elements.brightLight};
    color: ${({ theme }) => theme.colors.text.themeDark};
  }
`;
