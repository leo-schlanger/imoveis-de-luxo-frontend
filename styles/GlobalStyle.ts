import { createGlobalStyle } from 'styled-components';
import colors from './colors';

export default createGlobalStyle`
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    background-color: ${colors.background};
    color: ${colors.text_color};
    -webkit-font-smoothing: antialiased;
  }

  #root {
    margin:0 auto;
    padding: 40px 0px;
  }

  border-style, input, button{
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    box-shadow: 0 0 0px 1000px ${colors.input_color} inset;
    transition: "color 9999s ease-out, background-color 9999s ease-out";
    transition-delay: 9999s;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }
`;
