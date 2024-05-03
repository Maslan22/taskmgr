import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default AppRoutes