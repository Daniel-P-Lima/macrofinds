import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  Avatar,
  Typography,
  AppBar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import user_icon from './assets/user.svg';
import dietas_icon from './assets/dietas.svg';
import tmb_icon from './assets/tmb.svg';
import metodologia_icon from './assets/metodologia.svg';

const drawerWidth = 240;

const navItems = [
  { to: '/', label: 'Dietas', icon: dietas_icon },
  { to: '/dadosUsuario', label: 'Calculadora de TMB', icon: tmb_icon },
  { to: '/metodologia', label: 'Metodologia', icon: metodologia_icon }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: '#e8f5e9', display: 'flex', flexDirection: 'column' }}>
      {/* perfil */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: '#bafcb1' }}>
        <Avatar src={user_icon} alt="Usuário" />
        <Typography variant="subtitle1" fontWeight={600}>
          USER_NAME
        </Typography>
      </Box>
      {/* links */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map(({ to, label, icon }) => (
          <Link key={to} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClick={() => setMobileOpen(false)}>
              <ListItemIcon>
                <img src={icon} alt={label} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { xs: 'flex', md: 'none' },
          background: 'transparent',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ minHeight: 48 }}>
          <IconButton edge="start" onClick={handleDrawerToggle}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {}
      <Box component="nav" aria-label="sidenav" sx={{ flexShrink: 0 }}>
        {}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #d9ffd4)'
            }
          }}
        >
          {drawerContent}
        </Drawer>

        {}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #d9ffd4)'
            }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
}
