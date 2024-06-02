import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';

export interface FormContainerProps extends FormHTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Card = ({ title, children, ...rest }: FormContainerProps) => {
  const navigete = useNavigate();

  const goBack = () => {
    navigete(-1);
  };

  return (
    <Container {...rest}>
      <Header>
        <GoBackButton onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </GoBackButton>
        {title && <Title>{title}</Title>}
      </Header>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.elements.brightLight};
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const GoBackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.themeDark};
  align-self: flex-start;
  flex: 0;
  &:hover {
    color: ${({ theme }) => theme.colors.text.dark};
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
