import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './styles/variables.css'
import './styles/base.css'
import './styles/component-overrides.css'
import './components/Header/Header.css'
import './components/Footer/Footer.css'
import './components/Hero/Hero.css'
import './components/MovieCard/MovieCard.css'
import './components/MovieList/MovieList.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
