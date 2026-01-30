import React, { useRef, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotDrawerProps {
  open: boolean;
  onClose: () => void;
  messages: Message[];
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({ open, onClose, messages, input, onInputChange, onSend }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1400 }}>
      <Box sx={{ width: 360, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <List sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {messages.map((msg: Message) => (
            <ListItem key={msg.id} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={msg.text}
                sx={{
                  bgcolor: msg.sender === 'user' ? '#1C7293' : '#e0e0e0',
                  color: msg.sender === 'user' ? '#fff' : '#333',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  maxWidth: '80%',
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ display: 'flex', p: 2, borderTop: '1px solid #eee' }}>
          <TextField
            value={input}
            onChange={onInputChange}
            placeholder="Type your message..."
            fullWidth
            size="small"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') onSend(); }}
          />
          <Button variant="contained" color="primary" onClick={onSend} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatbotDrawer;
