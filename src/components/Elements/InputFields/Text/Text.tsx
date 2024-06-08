import { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  Container,
  LabelText,
  StyledError,
} from '@/components/Elements/InputFields/StyledElements.tsx';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <Container>
        <LabelText>{label}</LabelText>
        <StyledInput aria-invalid={error ? 'true' : 'false'} {...rest} ref={ref} maxLength={300} />
        <StyledError>{error}</StyledError>
      </Container>
    );
  }
);

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  color: ${({ theme }) => theme.colors.text.dark};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.elements.light};
  border-radius: 0;
  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.elements.dark};
    outline: none;
  }
  &:invalid {
    border-color: ${({ theme }) => theme.colors.buttons.danger};
  }
`;
