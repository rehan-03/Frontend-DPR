import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    Pagination,
    Menu,
    MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    LinearProgress,
    Grid,
    Stack,
    Tooltip
} from '@mui/material';

// Mock Data
const initialDocuments = [
    { id: 'DPR-2023-001', name: 'Road Infrastructure Improvement - Assam Phase I', state: 'Assam', date: '2023-10-25', status: 'Approved', score: 88 },
    { id: 'DPR-2023-002', name: 'Urban Water Supply Scheme - Imphal', state: 'Manipur', date: '2023-10-24', status: 'Processing', score: null },
    { id: 'DPR-2023-003', name: 'Community Health Center Construction', state: 'Nagaland', date: '2023-10-23', status: 'Review Needed', score: 45 },
    { id: 'DPR-2023-004', name: 'Solar Grid Implementation - Agartala', state: 'Tripura', date: '2023-10-22', status: 'Approved', score: 92 },
    { id: 'DPR-2023-005', name: 'Eco-Tourism Circuit Development', state: 'Meghalaya', date: '2023-10-20', status: 'Rejected', score: 12 },
    { id: 'DPR-2023-006', name: 'Rural Connectivity Bridge', state: 'Sikkim', date: '2023-10-18', status: 'Approved', score: 78 },
    { id: 'DPR-2023-007', name: 'Smart Classroom Project', state: 'Mizoram', date: '2023-10-15', status: 'Processing', score: null },
    { id: 'DPR-2023-008', name: 'Flood Management System', state: 'Assam', date: '2023-10-12', status: 'Review Needed', score: 60 },
];

const AllDocuments: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [documents] = useState(initialDocuments);
    const [page, setPage] = useState(1);

    // State for View Report Dialog
    const [openReport, setOpenReport] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    // State for Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    // State for Filter Menu
    const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const openFilter = Boolean(filterAnchor);

    // Handlers
    const handleViewReport = (doc: any) => {
        setSelectedDoc(doc);
        setOpenReport(true);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setFilterAnchor(event.currentTarget);
    };

    const handleFilterClose = (status: string | null) => {
        if (status) setFilterStatus(status);
        setFilterAnchor(null);
    };

    const handleExport = () => {
        const headers = ["ID", "Name", "State", "Date", "Status", "Score"];
        const rows = filteredDocs.map(doc => [
            doc.id,
            `"${doc.name}"`, // Quote name to handle commas
            doc.state,
            doc.date,
            doc.status,
            doc.score || "N/A"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "dpr_documents_list.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Processing': return 'info';
            case 'Review Needed': return 'warning';
            case 'Rejected': return 'error';
            default: return 'default';
        }
    };

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.state.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'All' || doc.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f2c59', mb: 1 }}>
                        All Documents
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage and track all submitted DPRs across regions.
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" startIcon={<DownloadIcon />} onClick={handleExport}>
                    Export List
                </Button>
            </Box>

            <Paper sx={{ width: '100%', mb: 2, p: 2, borderRadius: 2, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
                {/* Toolbar */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} justifyContent="space-between">
                    <TextField
                        placeholder="Search by ID, Name or State..."
                        variant="outlined"
                        size="small"
                        sx={{ width: { xs: '100%', sm: 400 } }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box>
                        <Button
                            variant={filterStatus === 'All' ? "outlined" : "contained"}
                            startIcon={<FilterListIcon />}
                            onClick={handleFilterClick}
                        >
                            Filter: {filterStatus}
                        </Button>
                        <Menu
                            anchorEl={filterAnchor}
                            open={openFilter}
                            onClose={() => handleFilterClose(null)}
                        >
                            <MenuItem onClick={() => handleFilterClose('All')}>All</MenuItem>
                            <MenuItem onClick={() => handleFilterClose('Approved')}>Approved</MenuItem>
                            <MenuItem onClick={() => handleFilterClose('Processing')}>Processing</MenuItem>
                            <MenuItem onClick={() => handleFilterClose('Review Needed')}>Review Needed</MenuItem>
                            <MenuItem onClick={() => handleFilterClose('Rejected')}>Rejected</MenuItem>
                        </Menu>
                    </Box>
                </Stack>

                {/* Table */}
                <TableContainer>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f5f7fa' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>DPR ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Project Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>State</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Quality Score</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDocs.map((doc) => (
                                <TableRow key={doc.id} hover>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                        {doc.id}
                                    </TableCell>
                                    <TableCell>{doc.name}</TableCell>
                                    <TableCell>{doc.state}</TableCell>
                                    <TableCell>{doc.date}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={doc.status}
                                            color={getStatusColor(doc.status) as any}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {doc.score !== null ? (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: doc.score > 80 ? 'green' : doc.score > 50 ? 'orange' : 'red'
                                                }}
                                            >
                                                {doc.score}%
                                            </Typography>
                                        ) : (
                                            <Typography variant="caption" color="text.secondary">--</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Details">
                                            <IconButton size="small" color="primary" onClick={() => handleViewReport(doc)}>
                                                <VisibilityIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton size="small" onClick={handleMenuClick}>
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Pagination count={3} color="primary" page={page} onChange={(e, v) => setPage(v)} />
                </Box>
            </Paper>

            {/* Actions Menu */}
            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
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
                    <DownloadIcon fontSize="small" sx={{ mr: 1.5 }} /> Download PDF
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Share Project</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Archive</MenuItem>
            </Menu>

            {/* Report View Dialog */}
            <Dialog open={openReport} onClose={() => setOpenReport(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f5f7fa' }}>
                    <Typography variant="h6" fontWeight="bold">Project Details</Typography>
                    <IconButton onClick={() => setOpenReport(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedDoc && (
                        <Box>
                            {/* Project Header */}
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Project File:
                            </Typography>
                            <Typography variant="body1" fontWeight="500" gutterBottom>
                                {selectedDoc.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                ID: {selectedDoc.id} | State: {selectedDoc.state}
                            </Typography>

                            {/* Workflow Stepper */}
                            <Box sx={{ width: '100%', my: 3 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
                                    PROJECT LIFECYCLE
                                </Typography>
                                <Stepper activeStep={selectedDoc.status === 'Approved' ? 3 : selectedDoc.status === 'Review Needed' ? 2 : selectedDoc.status === 'Processing' ? 1 : 0} alternativeLabel>
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
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenReport(false)} variant="contained" color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllDocuments;
