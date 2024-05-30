import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.elements.light};
  margin: 0.5rem 0;
  border-radius: 1rem;
`;

export default Divider;
