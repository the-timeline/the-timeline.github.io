import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { auth, firestore, firebase } from '../lib/firebase.js'
import Header from "../components/header.js"
import "vis-timeline/styles/vis-timeline-graph2d.css";
import "../styles/timeline.css";
import { useRouter } from 'next/router'
import 'tippy.js/dist/tippy.css'; // optional for styling


export const TitleContext = createContext(["", () => {}]);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter()
  const [title, setTitle] = useState("THE TIMELINE");

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <TitleContext.Provider value={[title, setTitle]}>
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
        </TitleContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
