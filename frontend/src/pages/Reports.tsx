import React from 'react';
import { Box, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

interface ReportsProps {
    onNavigate?: (page: string) => void;
}

const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f2c59', mb: 1 }}>
                    DPR Analysis Reports
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Generate and download comprehensive analysis reports for your DPR documents
                </Typography>
            </Box>

            <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRadius: 2, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <DescriptionIcon sx={{ fontSize: 60, color: '#9e9e9e' }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                            No Reports Available
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Upload and analyze DPR documents to generate reports
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onNavigate?.('dashboard')}
                            sx={{
                                px: 4,
                                py: 1,
                                bgcolor: '#1976d2',
                                textTransform: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    bgcolor: '#1565c0'
                                }
                            }}
                        >
                            Go to Dashboard
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Reports;
