import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import RegistrationForm from './pages/Register'
import LoginForm from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProfileUpdate from './pages/ProfileUpdate'
import AdminLogin from './pages/AdminLogin'

        
  const isLogin = JSON.parse(localStorage.getItem('isLogin'))
  const role = localStorage.getItem('role')
  const userId = localStorage.getItem('id')

  console.log(isLogin, role, userId)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<RegistrationForm/>} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/profile' element={<ProfileUpdate isLogin={isLogin} role={role} userId={userId} />} />
      <Route path='/admin-login' element={<AdminLogin isLogin={isLogin}/>} />
    </Routes>
   </BrowserRouter>
  </StrictMode>,
)
