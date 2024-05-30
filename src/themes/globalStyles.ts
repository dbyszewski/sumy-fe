import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
      box-sizing: border-box;
      margin: 0;
      text-decoration: none;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.dark};
  }
`;
