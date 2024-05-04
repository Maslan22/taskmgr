import './App.css';
import Header from './Components/Layouts/Header';  
import Footer from './Components/Layouts/Footer';   
import AppRoutes from './Components/Layouts/AppRoutes';
import { Fragment } from 'react/jsx-runtime';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 

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
