import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

export type ButtonProps = {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: [2, 4],
  md: [2, 6],
  lg: [3, 8],
};

export const Button = ({ variant, size, children }: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton variant={variant} size={size}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  ${({ variant, size, theme }) => {
    const bgColor = theme.colors.buttons[variant];
    return css`
      background-color: ${bgColor};
      font: ${theme.text};
      font-size: ${theme.text[size]};
      padding: ${theme.space[sizes[size][0]]} ${theme.space[sizes[size][1]]};
      border-radius: 1rem;
      border: 0;
      &:hover {
        transform: translateY(-2px);
        background-image: linear-gradient(rgb(0 0 0/10%) 0 0);
      }
    `;
  }}
`;
