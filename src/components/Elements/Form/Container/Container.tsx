import { FormHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface FormContainerProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
}

export const FormContainer = ({ title, children, ...rest }: FormContainerProps) => {
  return (
    <Container {...rest}>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};

// TODO: Use theme
const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f9f9f9;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;
