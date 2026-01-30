import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260;
const collapsedWidth = 65;

interface GovSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'upload', text: 'Upload Documents', icon: <CloudUploadIcon /> },
  { id: 'reports', text: 'Reports', icon: <AssessmentIcon /> },
  { id: 'geo', text: 'Geospatial Verification', icon: <MapIcon /> },
  { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
];

const GovSidebar: React.FC<GovSidebarProps> = ({ collapsed, onToggle, currentPage, onNavigate }) => {
  return (
    <Box
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        bgcolor: '#fff',
        borderRight: '1px solid rgba(0,0,0,0.12)',
        height: '100%',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflowX: 'hidden'
      }}
    >
      <Box sx={{
        p: 2,
        bgcolor: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        height: 56
      }}>
        {!collapsed && (
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            MAIN MENU
          </Typography>
        )}
        <IconButton onClick={onToggle} size="small">
          {collapsed ? <MenuIcon color="action" /> : <MenuOpenIcon color="action" />}
        </IconButton>
      </Box>
      <Divider />
      <List disablePadding>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={collapsed ? item.text : ''} placement="right">
              <ListItemButton
                selected={currentPage === item.id}
                onClick={() => onNavigate(item.id)}
                sx={{
                  minHeight: 48,
                  justifyContent: collapsed ? 'center' : 'initial',
                  borderLeft: currentPage === item.id && !collapsed ? '4px solid #0f2c59' : '4px solid transparent',
                  px: 2.5,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(15, 44, 89, 0.08)',
                    color: '#0f2c59',
                    '& .MuiListItemIcon-root': {
                      color: '#0f2c59',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.04)',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 3,
                    justifyContent: 'center',
                    color: currentPage === item.id ? '#0f2c59' : '#666'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: collapsed ? 0 : 1, transition: 'opacity 0.2s' }}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: currentPage === item.id ? 600 : 400,
                    whiteSpace: 'nowrap'
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GovSidebar;
