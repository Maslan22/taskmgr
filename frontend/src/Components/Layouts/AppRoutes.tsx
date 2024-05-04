import LoginPage from '../../pages/LoginPage';
import RegistrationsPage from '../../pages/RegisterationsPage';
import Dashboard from '../../pages/Dashboard';
import CreateEvents from '../../pages/events/Create';
import { Route, Routes } from 'react-router-dom';
import Events from '../../pages/events/Events';
import EditEvents from '../../pages/events/Edit';
import Users from '../../pages/users/Users';
import CreateUsers from '../../pages/users/Create';
import EditUsers from '../../pages/users/Edit';
import ResetPassword from '../../pages/ResetPassword';
import UpdatePassword from '../../pages/UpdatePassword';

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/register" element={<RegistrationsPage/>}/> 
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/password-update/:id" element={<UpdatePassword />}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/events" element={<Events />}/>
            <Route path="/events/create" element={<CreateEvents />}/>
            <Route path="/events/:id/edit" element={<EditEvents />}/>
            <Route path="/users" element={<Users />}/>
            <Route path="/users/create" element={<CreateUsers />}/>
            <Route path="/users/:id/edit" element={<EditUsers />}/>
        </Routes>
    </div>
  )
}

export default AppRoutes