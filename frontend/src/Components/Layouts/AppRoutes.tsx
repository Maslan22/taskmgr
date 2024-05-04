import { Routes, Route } from 'react-router-dom';
import Login from '../Body/bodyWidgets/Login';
import Signup from '../Body/bodyWidgets/Signup'; 
import LoginPage from '../../pages/LoginPage';
import RegistrationsPage from '../../pages/RegisterationsPage';
import Dashboard from '../../pages/Dashboard';
import CreateEvents from '../../pages/events/Create';

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegistrationsPage/>}/> 
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/events/create" element={<CreateEvents />}/>
        </Routes>
    </div>
  )
}

export default AppRoutes