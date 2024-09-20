import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'



function App() {
  return (
    <div>
      <Routes>
        <Route path='/Register' element={<RegisterPage/>} />
        <Route path='/Login' element={<RegisterPage/>} />
        <Route path='/Dashboard' element={<RegisterPage/>} />
        <Route path='/Landing' element={<RegisterPage/>} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
