import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UIKit from './pages/UIKit.tsx'

/* Hafif pathname tabanlı mini-router (router bağımlılığı olmadan) */
function Root() {
  const path = window.location.pathname
  if (path === '/ui-kit' || path === '/ui-kit/') return <UIKit />
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
