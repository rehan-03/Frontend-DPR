import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    InputAdornment,
    IconButton,
    Divider,
    Container,
    Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication
        if (email === 'admin' && password === 'admin') {
            onLogin();
        } else {
            setError('Invalid credentials. Try admin / admin');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', display: 'flex', flexDirection: 'column' }}>

            {/* Top Bar */}
            <Box sx={{ bgcolor: '#0B3C5D', py: 1 }}>
                <Container maxWidth="xl">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Emblem"
                            style={{ height: 40, filter: 'brightness(0) invert(1)' }}
                        />
                        <Box>
                            <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.7rem' }}>GOVERNMENT OF INDIA</Typography>
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>Government of India</Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Paper
                    elevation={4}
                    sx={{
                        maxWidth: 900,
                        width: '100%',
                        display: 'flex',
                        borderRadius: 3,
                        overflow: 'hidden',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    {/* Left Side: Branding */}
                    <Box sx={{
                        flex: 1,
                        bgcolor: '#0f2c59',
                        color: 'white',
                        p: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative Circle */}
                        <Box sx={{
                            position: 'absolute',
                            top: -50,
                            left: -50,
                            width: 200,
                            height: 200,
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%'
                        }} />

                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                                alt="Emblem"
                                style={{ height: 80, marginBottom: 20, filter: 'brightness(0) invert(1)' }}
                            />
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                DPR Quality Assessment System
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
                                Advanced AI-powered portal for monitoring, analyzing, and grading Development Project Reports.
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <img src="/digital-india-logo.png" alt="Digital India" style={{ height: 40, background: 'white', padding: 5, borderRadius: 4 }} onError={(e) => e.currentTarget.style.display = 'none'} />
                            </Stack>
                        </Box>
                    </Box>

                    {/* Right Side: Login Form */}
                    <Box sx={{ flex: 1, p: 5 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
                            Sign In
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Enter your credentials to access the portal
                        </Typography>

                        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                        <form onSubmit={handleLogin}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Username / Email"
                                    fullWidth
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    // Default value helper
                                    helperText="Demo: admin"
                                />
                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    helperText="Demo: admin"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* Mock Captcha */}
                                <Box sx={{ p: 1.5, bgcolor: '#f0f2f5', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'monospace', letterSpacing: 3, fontWeight: 'bold', color: '#555' }}>
                                        8 X 2 A
                                    </Typography>
                                    <Button size="small">Refresh</Button>
                                </Box>
                                <TextField
                                    placeholder="Enter Captcha"
                                    size="small"
                                    fullWidth
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={<LoginIcon />}
                                    sx={{ py: 1.5, fontWeight: 600 }}
                                >
                                    Login
                                </Button>

                                <Divider>OR</Divider>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    startIcon={<FingerprintIcon />}
                                    sx={{ py: 1.5, fontWeight: 600, color: '#0B3C5D', borderColor: '#0B3C5D' }}
                                >
                                    Login with Parichay
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Paper>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 2, textAlign: 'center', bgcolor: '#e0e0e0' }}>
                <Typography variant="caption" color="text.secondary">
                    Designed, Developed and Hosted by National Informatics Centre (NIC)
                </Typography>
            </Box>

        </Box>
    );
};

export default Login;
