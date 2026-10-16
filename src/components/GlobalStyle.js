import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Manrope", sans-serif;
    overflow: visible;
    background-color: ${({ theme }) => theme.colors.contentBg}; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media screen and (min-width: ${({ theme }) => theme.layout.mobile}){
      background-color: ${({ theme }) => theme.colors.mainBg}; 
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  } 
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    /* font-size: 18px; */
  }
`;
