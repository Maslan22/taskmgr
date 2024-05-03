import './App.css';
import Header from './Components/Header/Header';  
import Footer from './Components/Footer/Footer';   
import AppRoutes from './Components/Body/bodyWidgets/AppRoutes';
import Login from './Components/Body/bodyWidgets/Login';
import Signup from './Components/Body/bodyWidgets/Signup';
import Dashboard from './Components/Body/bodyWidgets/Dashboard';
import { Fragment } from 'react/jsx-runtime';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Fragment> 
    {/* <Browser> */}
      <main>
        FREE
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav> */}
        
        {/* <Routes> */}
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>

        </Router>
            {/* <Route path="/" component={Login}/>
            <Route path="/register" component={Signup}/>
            <Route path="/dashboard" component={Dashboard}/> */}
        {/* </Routes> */}
      </main>
      {/* <Header/> */}
      {/* <AppRoutes/> */}
      {/* <Footer/>   */}
      {/* </Browser> */}
    </Fragment>
  );
}

export default App;
