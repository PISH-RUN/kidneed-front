import {Grid, Button, Box} from '@mui/material';
import Image from 'next/image';
import LogoImage from '../public/images/logo.png';
import DashboardIcon from 'layouts/icons/dashboard';
import {ThemeProvider} from '@mui/material';
import {theme, RTL} from './muiBase';
import BaseLayout from './baseLayout';

export type ParentDashboardLayoutProps = {
  children: React.ReactNode;
  SideComponent?: React.ReactNode;
};

const styles = {
  navButton: {
    px: 4,
    py: 3,
    borderRadius: 3,
    width: 220,
    fontSize: 20,
    '& svg': {
      fontSize: '28px!important',
      mr: 1
    },
    color: '#8CA3A5'
  },
  activeNavButton: {
    color: '#fff',
  }
}

const NavBar = () => {
  return (
      <Box sx={{
        textAlign: 'center',
        p: 2
      }}>
        <Box sx={{maxWidth: 210, p: 2, margin: '0 auto'}}><Image src={LogoImage} alt="logo"/></Box>
        <Box sx={{mt: 5}}>
          <Button sx={styles.navButton} color="primary" startIcon={<DashboardIcon/>}>داشبورد</Button>
          <Button sx={{...styles.navButton, ...styles.activeNavButton}} variant="contained"
                  startIcon={<DashboardIcon/>}>داشبورد</Button>
          <Button sx={styles.navButton} color="primary" startIcon={<DashboardIcon/>}>داشبورد</Button>
          <Button sx={styles.navButton} color="primary" startIcon={<DashboardIcon/>}>داشبورد</Button>
        </Box>
      </Box>
  )
}

export default function ParentDashboardLayout({children, SideComponent}: ParentDashboardLayoutProps) {
  return <BaseLayout>
    <Grid container spacing={2}>
      <Grid item sx={{width: 300}}>
        <NavBar/>
      </Grid>
      <Grid item xs>
        <Box sx={{borderRadius: 8, p: 2, mt: 2, maxWidth: '98%', background: '#F5F9F8', minHeight: '90vh'}}>
          {children}
        </Box>
      </Grid>
      {!!SideComponent && <Grid item sx={{width: {xl: 300, xs: 250}}}>
        {SideComponent}
      </Grid>}
    </Grid>
  </BaseLayout>;
}
