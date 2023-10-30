import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Inicio from './pages/Inicio/index.tsx'
import Favoritos from './pages/Favoritos/index.tsx'
import Personagem from './pages/Personagem/index.tsx'
import PaginaBase from './pages/PaginaBase/index.tsx'
import Comics from './pages/Comics/index.tsx'


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaBase />}>
          <Route index element={<Inicio />} />
          <Route path='/favoritos' element={<Favoritos />} />
          <Route path='/comics' element={<Comics />} />
          <Route path='/:id' element={<Personagem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}