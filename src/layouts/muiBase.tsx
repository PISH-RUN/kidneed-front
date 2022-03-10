import {createTheme} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "IRANSans, Tahoma, sans-serif",
  },
  palette: {
    primary: {
      main: '#57ABF4',
    },
    secondary: {
      main: '#F45757',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        containedPrimary: {color: '#fff'},
      }
    }
  }
});


// Create rtl cache
const cacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [rtlPlugin],
});

export type Props = {
  children: JSX.Element;
};

export const RTL = ({children}: Props) => {
  return <CacheProvider value={cacheRtl}> {children} </CacheProvider>;
};
