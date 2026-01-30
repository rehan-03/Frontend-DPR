import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const GovHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // TODO: Implement actual logout logic
    console.log('User logged out');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0B3C5D', boxShadow: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>

          {/* Left: Emblem & Branding */}
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="State Emblem of India"
              style={{ height: 45, width: 'auto', filter: 'brightness(0) invert(1)' }} // White emblem
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.1, fontSize: '0.75rem', color: '#fff' }}>
                भारत सरकार
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1, color: '#fff', fontSize: '1.1rem' }}>
                Government of India
              </Typography>
            </Box>
          </Stack>

          {/* Spacer to push content to right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right: App Controls */}
          <Stack direction="row" spacing={3} alignItems="center">

            {/* Digital India Logo */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 2 }}>
              <img
                src="/digital-india-logo.png"
                alt="Digital India"
                style={{ height: 40, background: 'white', borderRadius: 4, padding: 2 }}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </Box>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Profile */}
            <Box>
              <IconButton
                onClick={handleMenuClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#ff9933', color: '#fff', fontWeight: 'bold' }}>
                  DA
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <AccountCircleIcon fontSize="small" sx={{ mr: 1.5 }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>

          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default GovHeader;
