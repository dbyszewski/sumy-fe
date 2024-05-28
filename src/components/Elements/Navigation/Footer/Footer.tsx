import styled from 'styled-components';

export const Footer = () => {
  return <FooterContainer>SafelyAround. {new Date().getFullYear()}</FooterContainer>;
};

const FooterContainer = styled.footer`
  z-index: 50;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.elements.dark};
  color: ${({ theme }) => theme.colors.text.light};
`;
