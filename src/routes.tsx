import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Inicio from './pages/Inicio/index.tsx'
import Favoritos from './pages/Favoritos/index.tsx'
import Personagem from './pages/Personagem/index.tsx'


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Inicio />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/:id' element={<Personagem />} />
      </Routes>    
    </BrowserRouter>
  )
}