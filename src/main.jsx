import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

const root = document.getElementById('root')
if (!root) {
  document.body.innerHTML = '<div style="padding:2rem;font-family:sans-serif;">No root element found. Check index.html for &lt;div id="root"&gt;</div>'
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <AppProvider>
          <App />
        </AppProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  )
}
