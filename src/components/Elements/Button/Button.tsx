import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
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
  &:disabled {
    background-color: ${({ theme }) => theme.colors.navigation.light};
    color: ${({ theme }) => theme.colors.text.dark};
    cursor: not-allowed;
  }
`;
