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
    Tooltip as ChartTooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Snackbar, Alert, Stepper, Step, StepLabel, LinearProgress, Stack } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Import StatCard
import StatCard from '../components/StatCard';

// Register ChartJS Components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend,
    ArcElement
);

interface DashboardProps {
    user?: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    const [openReport, setOpenReport] = React.useState(false);
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const [selectedReport, setSelectedReport] = React.useState<any>(null);
    const [feedbackText, setFeedbackText] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

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
        { id: 1, name: 'Road_Project_Assam_Phase1.pdf', date: '2023-10-25', status: 'Completed', score: 88, adminComment: "Excellent alignment with environmental norms." },
        { id: 2, name: 'Water_Supply_Manipur.docx', date: '2023-10-24', status: 'Processing', score: null, adminComment: "Pending final review." },
        { id: 3, name: 'Bridge_Construct_Nagaland.pdf', date: '2023-10-24', status: 'Review Needed', score: 45, adminComment: "Structural integrity analysis returned warnings. Please review section 4.2." },
        { id: 4, name: 'Solar_Grid_Tripura.pdf', date: '2023-10-23', status: 'Completed', score: 92, adminComment: "Approved for funding." },
        { id: 5, name: 'Urban_Housing_Mizoram.docx', date: '2023-10-22', status: 'Failed', score: 0, adminComment: "Missing critical environmental clearance documents." },
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

    const handleViewReport = (row: any) => {
        setSelectedReport(row);
        setOpenReport(true);
    };

    const handleGiveFeedback = (row: any) => {
        setSelectedReport(row);
        // Pre-fill if comment exists (mock logic usually needs robust state updates but this works for demo)
        setFeedbackText(row.adminComment || '');
        setOpenFeedback(true);
    };

    const submitFeedback = () => {
        // In a real app, you'd send 'feedbackText' to the backend for 'selectedReport.id'
        console.log(`Submitting feedback for ${selectedReport?.id}: ${feedbackText}`);
        setOpenFeedback(false);
        setSnackbarOpen(true);
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
                                    {(user?.roleType === 'author' || user?.roleType === 'admin') && <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>}
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
                                        {(user?.roleType === 'author' || user?.roleType === 'admin') && (
                                            <TableCell>
                                                {user?.roleType === 'author' && (
                                                    <Tooltip title="View Admin Report">
                                                        <IconButton size="small" color="primary" onClick={() => handleViewReport(row)}>
                                                            <VisibilityIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                {user?.roleType === 'admin' && (
                                                    <Tooltip title="Give Feedback">
                                                        <IconButton size="small" color="secondary" onClick={() => handleGiveFeedback(row)}>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Admin Report Dialog */}
            <Dialog open={openReport} onClose={() => setOpenReport(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f5f7fa' }}>
                    <Typography variant="h6" fontWeight="bold">Admin Report</Typography>
                    <IconButton onClick={() => setOpenReport(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedReport && (
                        <Box>
                            {/* Project Header */}
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Project File:
                            </Typography>
                            <Typography variant="body1" fontWeight="500" gutterBottom>
                                {selectedReport.name}
                            </Typography>

                            {/* Workflow Stepper */}
                            <Box sx={{ width: '100%', my: 3 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
                                    PROJECT LIFECYCLE
                                </Typography>
                                <Stepper activeStep={selectedReport.status === 'Completed' ? 3 : selectedReport.status === 'Review Needed' ? 2 : 1} alternativeLabel>
                                    {['Uploaded', 'AI Analysis', 'Admin Review', 'Approval'].map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>

                            {/* AI Breakdown */}
                            <Box sx={{ my: 3, p: 2, bgcolor: '#f0f4f8', borderRadius: 2 }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                    <AutoAwesomeIcon color="secondary" fontSize="small" />
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        AI QUALITY ASSESSMENT
                                    </Typography>
                                </Stack>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="caption" fontWeight="600">Environmental Impact</Typography>
                                            <Typography variant="caption">85%</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 6, borderRadius: 3 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="caption" fontWeight="600">Financial Feasibility</Typography>
                                            <Typography variant="caption">72%</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={72} color="warning" sx={{ height: 6, borderRadius: 3 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="caption" fontWeight="600">Legal Compliance</Typography>
                                            <Typography variant="caption">95%</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={95} color="primary" sx={{ height: 6, borderRadius: 3 }} />
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Admin Comment */}
                            {selectedReport.adminComment && (
                                <Box sx={{ my: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 2, borderLeft: '4px solid #1976d2' }}>
                                    <Typography variant="subtitle2" color="primary" gutterBottom>
                                        Admin Feedback:
                                    </Typography>
                                    <Typography variant="body2">
                                        {selectedReport.adminComment}
                                    </Typography>
                                </Box>
                            )}

                            <Typography variant="caption" color="text.secondary">
                                Status: {selectedReport.status} | Reviewed on: {new Date().toLocaleDateString()}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenReport(false)} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Admin Feedback Dialog */}
            <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Provide Feedback</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Reviewing: <strong>{selectedReport?.name}</strong>
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="feedback"
                        label="Admin Comments / Instructions"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFeedback(false)}>Cancel</Button>
                    <Button onClick={submitFeedback} variant="contained" color="primary">Submit Feedback</Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Feedback submitted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
