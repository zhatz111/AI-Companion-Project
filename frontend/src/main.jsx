import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConversationProvider } from './api/ConversationContext';
import { AuthProvider } from "./api/AuthContext";
import { CharacterProvider } from './api/CharacterContext.jsx';
import { EventProvider } from "./api/EventContext";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <EventProvider>
    <AuthProvider>
      <CharacterProvider>
        <ConversationProvider>
          <App />
        </ConversationProvider>
      </CharacterProvider>
    </AuthProvider>
  </EventProvider>
  // </StrictMode>,
)
