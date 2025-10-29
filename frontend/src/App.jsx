import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/DashboardAdmin/Dashboard'
// import DashboardTaixe from './pages/DashboardTX/DashboardTaixe'
// import DashboardPH from './pages/DashboardPH/DashboardPH'
import StudentListForAdmin from './pages/StudentListForAdmin/StudenListForAdmin'
import StudentListForDriver from './pages/StudentListForDriver/StudentListForDriver'
import BusListForAdmin from './pages/BusListForAdmin/BusListForAdmin'
import StudentInfoPH from './pages/StudentInfoPH/StudentInfoPH'
import AlertManagement from './pages/AlertManagement/AlertManagement'
import TripReportDriver from './pages/TripReportDriver/TripReportDriver'
import RouteMapDriver from './pages/RouteMapDriver/RouteMapDriver'
import MessageManagement from './pages/MessageManagement/MessageManagement'
import ParentSettings from './pages/ParentSettings/ParentSettings'
import DriverForAdmin from './pages/DriverForAdmin/DriverForAdmin'
// import AdminTuyenDuong from './pages/AdminTuyenDuong/AdminTuyenDuong'
// import AdminLichTrinh from './pages/AdminLichTrinh/AdminLichTrinh'
// import AdminTinnhan from './pages/AdminTinnhan/AdminTinnhan'
// import AdminCanhbao from './pages/AdminCanhbao/AdminCanhbao'
// import DriverCanhbao from './pages/DriverCanhbao/DriverCanhbao'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Login />}/>

        {/* ADMIN ROUTES */}
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/students' element={<StudentListForAdmin/>}/>
        <Route path='/admin/drivers' element={<DriverForAdmin/>}/>
        <Route path='/admin/buses' element={<BusListForAdmin/>}/>
        {/* <Route path='/admin/routes' element={<AdminTuyenDuong/>}/>
        <Route path='/admin/schedules' element={<AdminLichTrinh/>}/> */}
        <Route path='/admin/messages' element={<MessageManagement/>}/>
        <Route path='/admin/alerts' element={<AlertManagement/>}/>

        {/* DRIVER ROUTES */}
        {/* <Route path='/driver/schedules' element={<DashboardTaixe/>}/> */}
        <Route path='/driver/students' element={<StudentListForDriver/>}/>
        <Route path='/driver/reports' element={<TripReportDriver/>}/>
        <Route path='/driver/routes' element={<RouteMapDriver/>}/>
        {/* <Route path='/driver/issues' element={<DriverCanhbao/>}/> */}
        

        {/* PARENT ROUTES */}
        {/* <Route path='/parent/childs' element={<DashboardPH/>}/> */}
        <Route path='/parent/child-info' element={<StudentInfoPH/>}/>
        {/* <Route path='/parent/alerts' element={<AlertManagement/>}/> */}
        {/* <Route path='/parent/messages' element={<MessageManagement/>}/> */}
        <Route path='/parent/settings' element={<ParentSettings/>}/>
          
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App

