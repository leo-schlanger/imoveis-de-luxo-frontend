/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import ContextProvider from '../hooks';
import theme from '../../styles/theme';
import GlobalStyle from '../../styles/GlobalStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
