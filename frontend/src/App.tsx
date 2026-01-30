import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UploadDocuments from './pages/UploadDocuments';
import Reports from './pages/Reports';
import GeospatialVerification from './pages/GeospatialVerification';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AllDocuments from './pages/AllDocuments';
import HelpSupport from './pages/HelpSupport';

import Signup from './pages/Signup';

// TODO: Replace with your actual router or main content
const App: React.FC = () => {
  // Use a user object or null instead of a boolean
  const [user, setUser] = useState<any>(null); // Replace 'any' with your User type if imported
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  const handleLogin = (userProfile: any) => {
    setUser(userProfile);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setAuthView('login');
  };

  // If not authenticated, show Login/Signup page
  if (!user) {
    if (authView === 'signup') {
      return <Signup onLogin={handleLogin} onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />;
  }

  // Authenticated Application
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'upload':
        return <UploadDocuments />;
      case 'reports':
        return <Reports onNavigate={setCurrentPage} />;
      case 'geo':
        return <GeospatialVerification />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile user={user} />;
      case 'docs':
        return <AllDocuments />;
      case 'help':
        return <HelpSupport />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage} userRole={user?.roleType || 'public'}>
      {renderPage()}
    </MainLayout>
  );
};

export default App;
