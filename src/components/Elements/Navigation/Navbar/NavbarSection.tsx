import styled from 'styled-components';

import { NavbarItem, NavbarItemProps } from '@/components/Elements/Navbar/NavbarItem.tsx';

export interface NavbarSectionProps {
  title: string;
  items: NavbarItemProps[];
}

export const NavbarSection = ({ title, items }: NavbarSectionProps) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <ItemsContainer>
        {items.map(({ title, href, icon }, index) => (
          <NavbarItem title={title} href={href} icon={icon} key={index} />
        ))}
      </ItemsContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  flex-direction: column;
  text-wrap: nowrap;
  padding: 0.75rem 0;
  margin: 0 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navigation.darkRed};
  &:first-child {
    padding-top: 0.5rem;
  }
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.dark};
  opacity: 0.75;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
