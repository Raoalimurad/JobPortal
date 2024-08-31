import './App.css'
import Header from './components/shared/Header'
import {Route,Routes} from "react-router-dom"
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import toast, { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Job from './pages/Job'
import Browser from './pages/Browser'
import Profile from './components/Profile'
import JobDescription from './pages/JobDescription'
import Companies from './pages/Admin/Companies'
import CompanyRegister from './pages/Admin/CompanyRegister'
import CompanySetUp from './pages/Admin/CompanySetUp'
import AdminJobs from './pages/Admin/AdminJobs'
import PostJob from './pages/Admin/PostJob'
import Applicants from './pages/Admin/Applicants'
import ProtectedRoute from './components/Admin/ProtectedRoute'
import SaveJobs from './pages/SaveJobs'
import UpdateJob from './pages/Admin/UpdateJob'

function App() {


  return (
    <>
    <Toaster/>

    {/* <Footer/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/jobs' element={<Job/>}/>
        <Route path='/saveJobs' element={<SaveJobs/>}/>
        <Route path='/job/description/:id' element={<JobDescription/>}/>
        <Route path='/browse' element={<Browser/>}/>
        <Route path='/profile' element={<Profile/>}/>
        {/* admin routes start from here */}
        <Route path='/admin/companies' element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
        <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyRegister/></ProtectedRoute>}/>
        <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetUp/></ProtectedRoute>}/>
        <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
        <Route path='/admin/jobs/:id' element={<ProtectedRoute><UpdateJob/></ProtectedRoute>}/>
        <Route path='/admin/job/create' element={<ProtectedRoute><PostJob/></ProtectedRoute>}/>
        <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
