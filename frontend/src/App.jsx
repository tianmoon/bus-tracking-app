import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Application'
import Login from './pages/Login/Login'
import Dashboard from './pages/DashboardAdmin/Dashboard'
import DashboardTaixe from './pages/DashboardTX/DashboardTaixe'
import DashboardPH from './pages/DashboardPH/DashboardPH'
import Test from './pages/Test/Test'

function App() {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Application' element={<Application/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard-container' element={<DashboardTaixe/>}/>
        <Route path='/ph-container' element={<DashboardPH/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  )
}

export default App

