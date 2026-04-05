// StrictMode helps spot potential issues during development.
import { StrictMode } from 'react'
// createRoot is the modern React 18 API for mounting the app.
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Render the App component into the div with id="root" in index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
