import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Paper
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SyncIcon from '@mui/icons-material/Sync';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';

// Chart.js Imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Import StatCard
import StatCard from '../components/StatCard';

// Register ChartJS Components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard: React.FC = () => {
    // 1. Mock Data for Stats
    const stats = {
        totalDocuments: 24,
        completedAnalysis: 18,
        processing: 4,
        averageScore: 78,
        feasibilityRating: 85,
        riskLevel: 'Low'
    };

    // 2. Chart Data
    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'DPRs Uploaded',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#0f2c59',
            },
            {
                label: 'Analysis Completed',
                data: [10, 15, 2, 4, 2, 2],
                backgroundColor: '#ff9933',
            },
        ],
    };

    const doughnutData = {
        labels: ['High Risk', 'Medium Risk', 'Low Risk'],
        datasets: [
            {
                data: [2, 5, 17],
                backgroundColor: [
                    '#d32f2f', // Red
                    '#ed6c02', // Orange
                    '#2e7d32', // Green
                ],
                borderWidth: 1,
            },
        ],
    };

    // 3. Recent Activity Data
    const recentActivity = [
        { id: 1, name: 'Road_Project_Assam_Phase1.pdf', date: '2023-10-25', status: 'Completed', score: 88 },
        { id: 2, name: 'Water_Supply_Manipur.docx', date: '2023-10-24', status: 'Processing', score: null },
        { id: 3, name: 'Bridge_Construct_Nagaland.pdf', date: '2023-10-24', status: 'Review Needed', score: 45 },
        { id: 4, name: 'Solar_Grid_Tripura.pdf', date: '2023-10-23', status: 'Completed', score: 92 },
        { id: 5, name: 'Urban_Housing_Mizoram.docx', date: '2023-10-22', status: 'Failed', score: 0 },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Processing': return 'info';
            case 'Review Needed': return 'warning';
            case 'Failed': return 'error';
            default: return 'default';
        }
    };

    // Helper to format values
    const formatValue = (val: any, suffix: string = '') => {
        if (val === null || val === undefined || isNaN(val)) return "0";
        return `${val}${suffix}`;
    };

    return (
        <Box sx={{ pb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f2c59', mb: 1 }}>
                    Dashboard Overview
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Real-time insights and analytics for DPR Quality Assessment
                </Typography>
            </Box>

            {/* Stat Cards Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Total Documents"
                        value={formatValue(stats.totalDocuments)}
                        subtitle="Uploads this month"
                        icon={<DescriptionIcon fontSize="medium" />}
                        color="#1976D2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Completed Analysis"
                        value={formatValue(stats.completedAnalysis)}
                        subtitle="98% Success Rate"
                        icon={<CheckCircleIcon fontSize="medium" />}
                        color="#2E7D32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Processing"
                        value={formatValue(stats.processing)}
                        subtitle="Queue Load: Low"
                        icon={<SyncIcon fontSize="medium" />}
                        color="#0288D1"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Average Score"
                        value={formatValue(stats.averageScore, '%')}
                        subtitle="Quality Index"
                        icon={<AnalyticsIcon fontSize="medium" />}
                        color="#7B1FA2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Feasibility Rating"
                        value={formatValue(stats.feasibilityRating, '%')}
                        subtitle="AI Prediction"
                        icon={<TrendingUpIcon fontSize="medium" />}
                        color="#00796B"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        title="Risk Level"
                        value={stats.riskLevel}
                        subtitle="Overall Project Risk"
                        icon={<WarningIcon fontSize="medium" />}
                        color="#ED6C02"
                    />
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#0f2c59' }}>
                                Application Trends (6 Months)
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <Bar
                                    data={barChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { position: 'top' as const } }
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#0f2c59' }}>
                                Risk Distribution
                            </Typography>
                            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                                <Doughnut
                                    data={doughnutData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { position: 'bottom' as const } }
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Activity Table */}
            <Card sx={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#0f2c59' }}>
                        Recent Uploads & Analysis
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>File Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Quality Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentActivity.map((row) => (
                                    <TableRow key={row.id} hover>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                color={getStatusColor(row.status) as any}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row.score !== null ? (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: row.score > 80 ? 'green' : row.score > 50 ? 'orange' : 'red'
                                                    }}
                                                >
                                                    {row.score}%
                                                </Typography>
                                            ) : (
                                                <Typography variant="caption" color="text.secondary">--</Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
