import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface DateTimeProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const DateTime = ({ label, error, id, ...rest }: DateTimeProps) => {
  return (
    <Container>
      <LabelText htmlFor={id}>{label}</LabelText>
      <input {...rest} type="datetime-local" id={id} name={id} />
      <StyledError>{error}</StyledError>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
`;

const LabelText = styled.label`
  display: block;
  margin-bottom: 0.5rem;
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
