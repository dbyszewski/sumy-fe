import styled from 'styled-components';

export const StyledError = styled.div`
  color: ${({ theme }) => theme.colors.buttons.danger};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  height: 2rem;
  display: flex;
`;

export const Container = styled.div`
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
`;

export const LabelText = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.themeDark};
`;
