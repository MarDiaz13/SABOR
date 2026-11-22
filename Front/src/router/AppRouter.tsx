import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import RecuperarPage from '../features/auth/pages/RecuperarPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recuperar" element={<RecuperarPage />} />
      </Routes>
    </BrowserRouter>
  )
}