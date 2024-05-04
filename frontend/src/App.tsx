import './App.css';
import Header from './Components/Layouts/Header';  
import Footer from './Components/Layouts/Footer';   
import AppRoutes from './Components/Layouts/AppRoutes';
import Login from './Components/Body/bodyWidgets/Login';
import Signup from './Components/Body/bodyWidgets/Signup';
import Dashboard from './Components/Body/bodyWidgets/Dashboard';
import { Fragment } from 'react/jsx-runtime';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Fragment> 
        <Router>
          <AppRoutes/>
        </Router> 
    </Fragment>
  );
}

export default App;
