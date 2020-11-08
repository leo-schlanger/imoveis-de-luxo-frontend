import { Fragment, useEffect } from "react";
import ContextProvider from '../hooks';
import { ThemeProvider } from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "../../styles/theme";
import GlobalStyle from "../../styles/GlobalStyle";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalStyle/>
          <Component {...pageProps} />
        </ThemeProvider>
      </ContextProvider>
    </Fragment>
  );
}

export default MyApp
