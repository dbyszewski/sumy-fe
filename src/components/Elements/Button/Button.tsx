import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: [2, 4],
  md: [2, 6],
  lg: [3, 8],
};

export const Button = ({ variant, size, children, ...rest }: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton {...rest} variant={variant} size={size}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  ${({ variant, size, theme }) => {
    return css`
      background-color: ${theme.colors.buttons[variant]};
      font: ${theme.text[size]};
      font-size: ${theme.text[size]};
      color: ${theme.colors.buttonsText};
      font-weight: ${theme.colors.buttonsFontWeight};
      padding: ${theme.space[sizes[size][0]]} ${theme.space[sizes[size][1]]};
      border-radius: 2rem;
      border: none;
      cursor: pointer;
      &:hover {
        background-image: linear-gradient(rgb(0 0 0/20%) 0 0);
      }
    `;
  }}
`;
