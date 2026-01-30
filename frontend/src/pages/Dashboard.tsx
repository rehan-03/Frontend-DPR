import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';

// Import the new StatCard component
import StatCard from '../components/StatCard';

const Dashboard: React.FC = () => {
    // Mock Data (Simulating potentially missing or invalid data)
    const data = {
        totalDocuments: 12,
        completedAnalysis: 8,
        processing: 4,
        averageScore: null, // Test null handling
        feasibilityRating: 85,
        riskLevel: undefined // Test undefined handling
    };

    // Helper to format values safely
    const formatValue = (val: any, suffix: string = '') => {
        if (val === null || val === undefined || isNaN(val)) {
            return "0";
        }
        return `${val}${suffix}`;
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f2c59', mb: 1 }}>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Overview of your DPR Quality Assessment
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Row 1 */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Documents"
                        value={formatValue(data.totalDocuments)}
                        subtitle="Uploaded Files"
                        icon={<DescriptionIcon fontSize="medium" />}
                        color="#1976D2" // Blue
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Completed Analysis"
                        value={formatValue(data.completedAnalysis)}
                        subtitle="Successfully Parsed"
                        icon={<CheckCircleIcon fontSize="medium" />}
                        color="#2E7D32" // Green
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Processing"
                        value={formatValue(data.processing)}
                        subtitle="In Progress"
                        icon={<SyncIcon fontSize="medium" />}
                        color="#0288D1" // Light Blue
                    />
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Average Score"
                        value={formatValue(data.averageScore, '%')}
                        subtitle="Completeness Score"
                        icon={<AnalyticsIcon fontSize="medium" />}
                        color="#7B1FA2" // Purple
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Feasibility Rating"
                        value={formatValue(data.feasibilityRating, '%')}
                        subtitle="AI Predicted Rating"
                        icon={<TrendingUpIcon fontSize="medium" />}
                        color="#00796B" // Teal
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Risk Level"
                        value="Low"
                        subtitle="Overall Project Risk"
                        icon={<WarningIcon fontSize="medium" />}
                        color="#ED6C02" // Orange
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
