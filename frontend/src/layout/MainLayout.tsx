import React, { ReactNode, useState } from 'react';
import ChatbotButton from '../components/chatbot/ChatbotButton';
import ChatbotDrawer from '../components/chatbot/ChatbotDrawer';
import GovHeader from './GovHeader';
import GovSidebar from './GovSidebar';
import GovFooter from './GovFooter';
import Box from '@mui/material/Box';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: string; // Add userRole prop
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onNavigate, userRole }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ id: number; text: string; sender: 'bot' | 'user' }[]>([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);

  const handleSidebarToggle = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleChatbotOpen = () => setChatbotOpen(true);
  const handleChatbotClose = () => setChatbotOpen(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setChatInput(e.target.value);
  const handleSend = () => {
    if (chatInput.trim() === '') return;
    setMessages((msgs) => [
      ...msgs,
      { id: msgs.length + 1, text: chatInput, sender: 'user' as const },
    ]);
    setChatInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f9fa' }}>
      <GovHeader onNavigate={onNavigate} />

      {/* Content Area with Sidebar */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        <GovSidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          currentPage={currentPage}
          onNavigate={onNavigate}
          userRole={userRole}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            py: 4,
            px: 3,
            minHeight: '60vh',
            maxWidth: sidebarCollapsed ? 'calc(100vw - 65px)' : 'calc(100vw - 260px)', // Adjust width
            transition: 'max-width 0.3s ease',
            overflowX: 'hidden'
          }}
        >
          {children}
        </Box>
      </Box>

      <GovFooter />

      <ChatbotButton onClick={handleChatbotOpen} />
      <ChatbotDrawer
        open={chatbotOpen}
        onClose={handleChatbotClose}
        messages={messages}
        input={chatInput}
        onInputChange={handleInputChange}
        onSend={handleSend}
      />
    </Box>
  );
};

export default MainLayout;
