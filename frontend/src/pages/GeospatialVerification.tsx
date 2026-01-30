import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ForestIcon from '@mui/icons-material/Forest';
import LandscapeIcon from '@mui/icons-material/Landscape';
import WaterIcon from '@mui/icons-material/Water';

// Fix for leaflet marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeospatialVerification: React.FC = () => {
    // Default center: India
    const center: [number, number] = [20.5937, 78.9629];

    return (
        <Box sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f2c59', mb: 2 }}>
                Geospatial Verification
            </Typography>

            <Box sx={{ display: 'flex', flex: 1, gap: 2, height: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
                {/* Left Pane: Map */}
                <Box sx={{ flex: 3, borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0', minHeight: 400, position: 'relative' }}>
                    <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[28.6139, 77.2090]}>
                            <Popup>
                                <b>New Delhi</b><br />Capital of India
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>

                {/* Right Pane: Info */}
                <Box sx={{ flex: 1, minWidth: 300 }}>
                    <Card sx={{ height: '100%', overflowY: 'auto' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Geospatial Data Layers</Typography>
                            <Box sx={{ bgcolor: '#03A9F4', color: '#fff', p: 1.5, borderRadius: 1, mb: 3, textAlign: 'center' }}>
                                Viewing Area: All India
                            </Box>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon><ForestIcon color="success" /></ListItemIcon>
                                    <ListItemText primary="Forest Cover" secondary="Layer Active" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><LandscapeIcon color="warning" /></ListItemIcon>
                                    <ListItemText primary="Landmarks & Terrain" secondary="Layer Active" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><WaterIcon color="info" /></ListItemIcon>
                                    <ListItemText primary="Hydrography (Rivers)" secondary="Layer Active" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default GeospatialVerification;
