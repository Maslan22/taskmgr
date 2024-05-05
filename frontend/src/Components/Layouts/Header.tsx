import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../../assets/logo.svg";

interface HeaderStates {
  firstName: string;
  lastName: string; 
  isAdmin: string;
}
export default function Header() {
  const navigate = useNavigate();
  const userSession = sessionStorage.getItem('user');
  const user = userSession ? JSON.parse(userSession): ''; 
  const [states, setStates] = useState<HeaderStates>({
    firstName: user.firstname || '',
    lastName: user.lastname || '',
    isAdmin: user.isadmin || "0"
  }); 
  const showDropDown = () => {
    const dropdown = document.getElementById("dropdownNavbar");
    const overlay = document.getElementById("overlay");
    if(dropdown && overlay){
      dropdown.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    }
  }

  const hideDropDown = () => {
    const dropdown = document.getElementById("dropdownNavbar");
    const overlay = document.getElementById("overlay");
    if(dropdown && overlay){
      dropdown.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  }
  const openMenu = () => {
  }
  const logout= () => {
    sessionStorage.clear();
    navigate("/");
  }
  return ( 

<nav className="bg-white border-gray-200">
  <div id="overlay" onClick={hideDropDown} className="absolute hidden h-screen w-screen z-10"></div>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="Edusogno" /> 
    </Link>
    <button onClick={openMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-40" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Main Menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
       {!(states.firstName.length !== 0) && <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        <li> 
          <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Login</Link>
        </li>
        <li>
          <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Sign Up</Link>
        </li>
        </ul>
}
{(states.firstName.length !== 0) &&
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
        <li>
        <button onClick={showDropDown} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto">Welcome {states.firstName + " " + states.lastName}<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg></button> 
            <div id="dropdownNavbar" className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute z-20">
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/events" className="block px-4 py-2 hover:bg-gray-100">Manage Events</Link>
                  </li>
                  {states.isAdmin !== "0" &&
                  <li>
                    <Link to="/users" className="block px-4 py-2 hover:bg-gray-100">Manage Users</Link>
                  </li>}
                </ul>
                <div className="py-1">
                  <div onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</div>
                </div>
            </div>
        </li>
      </ul>
}
    </div>
  </div>
</nav>
  );
}
