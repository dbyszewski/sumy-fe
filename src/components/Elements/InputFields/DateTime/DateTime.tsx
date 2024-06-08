import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  Container,
  LabelText,
  StyledError,
} from '@/components/Elements/InputFields/StyledElements.tsx';

interface DateTimeProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const DateTime = ({ label, error, id, value, ...rest }: DateTimeProps) => {
  return (
    <Container>
      <LabelText htmlFor={id}>{label}</LabelText>
      <StyledDatePicker {...rest} type="datetime-local" id={id} name={id} defaultValue={value} />
      <StyledError>{error}</StyledError>
    </Container>
  );
};

const StyledDatePicker = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.elements.light};
  border-radius: 0;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.elements.dark}};
    outline: none;
  }
  &:invalid {
    border-color: ${({ theme }) => theme.colors.buttons.danger};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;
