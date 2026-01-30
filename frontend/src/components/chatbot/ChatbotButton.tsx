import React from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => (
  <Fab
    color="secondary"
    aria-label="Open Chatbot"
    onClick={onClick}
    sx={{
      position: 'fixed',
      bottom: 32,
      right: 32,
      zIndex: 1300,
    }}
  >
    <ChatIcon />
  </Fab>
);

export default ChatbotButton;
