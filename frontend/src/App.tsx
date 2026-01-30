import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UploadDocuments from './pages/UploadDocuments';
import Reports from './pages/Reports';
import GeospatialVerification from './pages/GeospatialVerification';

// TODO: Replace with your actual router or main content
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadDocuments />;
      case 'reports':
        return <Reports onNavigate={setCurrentPage} />;
      case 'geo':
        return <GeospatialVerification />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
};

export default App;
