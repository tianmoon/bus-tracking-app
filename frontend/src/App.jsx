import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Application'
import Login from './pages/Login/Login'
import Dashboard from './pages/DashboardAdmin/Dashboard'
import DashboardTaixe from './pages/DashboardTX/DashboardTaixe'
import DashboardPH from './pages/DashboardPH/DashboardPH'
import Test from './pages/Test/Test'
import StudentListForAdmin from './pages/StudentListForAdmin/StudenListForAdmin'
import StudentListForDriver from './pages/StudentListForDriver/StudentListForDriver'
import BusListForAdmin from './pages/BusListForAdmin/BusListForAdmin'
import StudentInfoPH from './pages/StudentInfoPH/StudentInfoPH'
import AlertManagement from './pages/AlertManagement/AlertManagement'
import TripReportDriver from './pages/TripReportDriver/TripReportDriver'
import RouteMapDriver from './pages/RouteMapDriver/RouteMapDriver'
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
        <Route path='/student-list-admin' element={<StudentListForAdmin/>}/>
        <Route path='/bus-list-admin' element={<BusListForAdmin/>}/>
        <Route path='/student-list-driver' element={<StudentListForDriver/>}/>
        <Route path='/student-info-parent' element={<StudentInfoPH/>}/>
        <Route path='/alerts' element={<AlertManagement/>}/>
        <Route path='/trip-report' element={<TripReportDriver/>}/>
        <Route path='/route-map' element={<RouteMapDriver/>}/>
      </Routes>
    </div>
  )
}

export default App

