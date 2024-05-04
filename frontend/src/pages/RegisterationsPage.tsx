import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../data";
import RootLayout from "./MainLayout";

interface signUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  alertWarning?: string;
}

function RegistrationsPage() {
  const navigate = useNavigate();
  const [states, setStates] = useState<signUpProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    alertWarning: "",
  });

  const updateStates = (key: string, value: any) => {
    setStates({
      ...states,
      [key]: value,
    });
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const submit = () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      firstName: states.firstName,
      lastName: states.lastName,
      email: states.email,
      password: states.password,
      isAdmin: false,
    };

    addUser(newUser);
    sessionStorage.setItem("user", JSON.stringify({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        isAdmin: false
        
    })); 
    navigate("/dashboard");
  };
  const validateFields = () => {
    console.log(states);
    states.firstName.length < 2
      ? updateStates(`alertWarning`, `First Name must be at least 2 characters`)
      : states.lastName.length < 2
      ? updateStates(`alertWarning`, `Last Name must be at least 2 characters`)
      : states.email.length < 5
      ? updateStates(`alertWarning`, `Email must be at least 5 characters`)
      : states.password.length < 8
      ? updateStates(`alertWarning`, `Password must be at least 8 characters`)
      : states.password !== states.confirmPassword
      ? updateStates(`alertWarning`, `Passwords must match`)
      : submit();
  };

  return (
    <RootLayout>
      <div>
        <div className="alert">{states.alertWarning}</div>
        <div className="form">
          <div
            className="input"
            defaultValue={states.firstName}
            onChange={(e: any) => {
              updateStates(`firstName`, e.target.value);
            }}
          >
            First Name: <input type="text" />
          </div>
          <div
            className="input"
            defaultValue={states.lastName}
            onChange={(e: any) => {
              updateStates(`lastName`, e.target.value);
            }}
          >
            Last Name: <input type="text" />
          </div>
          <div
            className="input"
            defaultValue={states.email}
            onChange={(e: any) => {
              updateStates(`email`, e.target.value);
            }}
          >
            Email: <input type="email" />
          </div>
          <div
            className="input"
            defaultValue={states.password}
            onChange={(e: any) => {
              updateStates(`password`, e.target.value);
            }}
          >
            Password: <input type="password" />
          </div>
          <div
            className="input"
            defaultValue={states.confirmPassword}
            onChange={(e: any) => {
              updateStates(`confirmPassword`, e.target.value);
            }}
          >
            Confirm Password: <input type="password" />
          </div>
          <button onClick={validateFields}>Sign up</button>
        </div>
      </div>
    </RootLayout>
  );
}

export default RegistrationsPage;
