import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  Container,
  LabelText,
  StyledError,
} from '@/components/Elements/InputFields/StyledElements.tsx';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <Container>
        <LabelText>{label}</LabelText>
        <StyledInput aria-invalid={error ? 'true' : 'false'} maxLength={300} ref={ref} {...rest} />
        <StyledError>{error}</StyledError>
      </Container>
    );
  }
);

const StyledInput = styled.textarea`
  width: 100%;
  height: 8rem;
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
