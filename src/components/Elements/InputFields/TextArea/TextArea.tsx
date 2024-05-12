import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  size: 'sm' | 'md' | 'lg';
  error?: string;
}

const sizes = {
  sm: [2, 4],
  md: [2, 6],
  lg: [3, 8],
};

export const TextArea = ({ label, size, error, ...rest }: InputProps) => {
  return (
    <Label>
      <LabelText>{label}</LabelText>
      <StyledInput size={size} aria-invalid={error ? 'true' : 'false'} {...rest} />
      <StyledError>{error}</StyledError>
    </Label>
  );
};

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
`;

const LabelText = styled.span`
  display: block;
  margin-bottom: 0.5rem;
`;

type StyledInputProps = {
  size: 'sm' | 'md' | 'lg';
};

const StyledInput = styled.textarea<StyledInputProps>`
  ${({ size, theme }) => {
    return css`
      width: 100%;
      max-width: 400px;
      height: 8rem;
      background-color: ${theme.colors.input};
      font-size: ${theme.text[size]};
      padding: ${theme.space[sizes[size][0]]} 5px;
      border: none;
      border-bottom: 2px solid ${theme.colors.input};
      border-radius: 0;
      &:focus,
      &:hover {
        border-color: ${theme.colors.buttons.primary};
        outline: none;
      }
      &:invalid {
        border-color: ${theme.colors.error};
      }
    `;
  }}
`;

const StyledError = styled.div`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.error};
      font-size: ${theme.text.sm};
      margin-top: 0.25rem;
      height: 2rem;
      display: flex;
    `;
  }}
`;
