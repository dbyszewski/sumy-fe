import styled, { css } from 'styled-components';

export type InputProps = {
  label: string;
  variant: 'text' | 'password' | 'email';
  size: 'sm' | 'md' | 'lg';
  id: string;
  error?: string;
  value?: string;
};

const sizes = {
  sm: [2, 4],
  md: [2, 6],
  lg: [3, 8],
};

export const TextInput = ({ id, label, variant, size, value, error }: InputProps) => {
  return (
    <Label htmlFor={id}>
      {label}
      <StyledInput id={label} type={variant} size={size} value={value} />
      {error && <span>{error}</span>}
    </Label>
  );
};

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
`;

type StyledInputProps = {
  size: 'sm' | 'md' | 'lg';
};

const StyledInput = styled.input<StyledInputProps>`
  ${({ size, theme }) => {
    return css`
      width: 100%;
      background-color: ${theme.colors.input};
      font-size: ${theme.text[size]};
      padding: ${theme.space[sizes[size][0]]} ${theme.space[sizes[size][1]]};
      border: none;
      border-bottom: 2px solid ${theme.colors.input};
      &:focus {
        border-bottom: 2px solid ${theme.colors.buttons.primary};
        outline: none;
      }
    `;
  }}
`;
