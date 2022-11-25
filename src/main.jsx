import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CallsContextProvider } from './context/CallsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CallsContextProvider>
      <App />
    </CallsContextProvider>
  </React.StrictMode>
)
