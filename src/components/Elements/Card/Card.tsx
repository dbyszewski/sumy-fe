import { FormHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface FormContainerProps extends FormHTMLAttributes<HTMLDivElement> {
  title: string;
}

export const Card = ({ title, children, ...rest }: FormContainerProps) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

// TODO: Use theme
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: #f9f9f9;
  padding: 1rem;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;
