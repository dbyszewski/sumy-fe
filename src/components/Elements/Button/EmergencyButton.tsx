import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const EmergencyButton = ({
  children,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 1rem 1.5rem;
  width: 100%;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.navigation.darkRed};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1.5rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  border: 1px solid transparent;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;
