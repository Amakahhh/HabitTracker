import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #42b8e0 0%, #acccc4 60%, #fff 100%);
    min-height: 100vh;
    color: #2b5561;
    transition: background 0.5s;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  input, textarea, button {
    font-family: inherit;
    outline: none;
  }
  a {
    color: #42b8e0;
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    text-decoration: underline;
    color: #2b5561;
  }
`;

export default GlobalStyle; 