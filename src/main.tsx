import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import './styles/main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Plans } from './pages/Plans/Plans'
import { Summary } from './pages/Summary/Summary'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/plans" element={<Plans />} />
      <Route path='/summary' element={<Summary />} />
    </Routes>
  </BrowserRouter>


)
