import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConversationProvider } from './api/ConversationContext';
import { AuthProvider } from "./api/AuthContext";
import { CharacterProvider } from './api/CharacterContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
      <CharacterProvider>
        <ConversationProvider>
          <App />
        </ConversationProvider>
      </CharacterProvider>
    </AuthProvider>
  // </StrictMode>,
)
