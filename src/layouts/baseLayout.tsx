import {ThemeProvider} from '@mui/material';
import {theme, RTL} from './muiBase';

export type ParentDashboardLayoutProps = {
  children: JSX.Element;
};

export default function BaseLayout({children}: ParentDashboardLayoutProps) {
  return <ThemeProvider theme={theme}>
    <RTL>
      {children}
    </RTL>
  </ThemeProvider>;
}
