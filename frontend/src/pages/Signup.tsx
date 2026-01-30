import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    IconButton,
    InputAdornment,
    Container,
    MenuItem,
    Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

interface SignupProps {
    onLogin: (user: any) => void;
    onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        role: 'public' // Default role
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName || !formData.email || !formData.password || !formData.role) {
            setError('Please fill in all required fields.');
            return;
        }

        // Map selection to internal roles
        let internalRoleType = 'public';
        let displayRole = 'Public User';
        let department = 'Citizen';

        if (formData.role === 'project_head') {
            internalRoleType = 'admin';
            displayRole = 'Project Head';
            department = 'Project Management Unit';
        } else if (formData.role === 'author') {
            internalRoleType = 'author';
            displayRole = 'DPR Author';
            department = 'Department of Planning';
        }

        // Create User Object
        const newUser = {
            name: `${formData.firstName} ${formData.lastName}`,
            role: displayRole,
            roleType: internalRoleType,
            department: department,
            email: formData.email,
            phone: formData.phone,
            location: 'India', // Default
            joinDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            employeeId: `NEW-${Math.floor(Math.random() * 1000)}`
        };

        // Simulate API call and login
        onLogin(newUser);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', display: 'flex', flexDirection: 'column' }}>

            {/* Top Bar (Simplified) */}
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
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>DPR Quality Assessment</Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Paper
                    elevation={4}
                    sx={{
                        maxWidth: 600,
                        width: '100%',
                        p: 4,
                        borderRadius: 3
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                            Create an Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join the DPR Assessment Platform
                        </Typography>
                    </Box>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <form onSubmit={handleSignup}>
                        <Stack spacing={2}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    fullWidth
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Last Name / Surname"
                                    name="lastName"
                                    fullWidth
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Stack>

                            <TextField
                                label="Email Address"
                                name="email"
                                type="email"
                                fullWidth
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                fullWidth
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <TextField
                                select
                                label="I am a..."
                                name="role"
                                fullWidth
                                required
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <MenuItem value="public">Public User</MenuItem>
                                <MenuItem value="project_head">Project Head</MenuItem>
                                <MenuItem value="author">DPR Author</MenuItem>
                            </TextField>

                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                value={formData.password}
                                onChange={handleChange}
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

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<PersonAddIcon />}
                                sx={{ py: 1.5, fontWeight: 600, mt: 2 }}
                            >
                                Register
                            </Button>

                            <Button
                                color="primary"
                                startIcon={<LoginIcon />}
                                onClick={onSwitchToLogin}
                                sx={{ mt: 1 }}
                            >
                                Already have an account? Login
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Signup;
