import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UploadDocuments from './pages/UploadDocuments';
import Reports from './pages/Reports';
import GeospatialVerification from './pages/GeospatialVerification';
import Login from './pages/Login';
import Settings from './pages/Settings';
import AllDocuments from './pages/AllDocuments';
import HelpSupport from './pages/HelpSupport';

// TODO: Replace with your actual router or main content
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  // If not authenticated, show Login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Authenticated Application
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
      case 'settings':
        return <Settings />;
      case 'docs':
        return <AllDocuments />;
      case 'help':
        return <HelpSupport />;
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
