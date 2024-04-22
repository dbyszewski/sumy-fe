import styled from 'styled-components';

export const Divider = styled.div`
  ${({ theme }) => `
    width: 100%; 
    max-width: 300px;
    min-width: 24rem;
    height: 3px; 
    background-color: #cdcdcd; 
    margin: ${theme.space[0]} 0; 
  `}
`;

export default Divider;
