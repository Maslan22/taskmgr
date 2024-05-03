import { useState } from "react";
import { Interface } from "readline";
import { Users, addUser } from "../../../data";
import { useNavigate } from "react-router-dom";

interface signUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  alertWarning?: string;
}

function Signup() {
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

  const submit = () => {
    const newUser = {
      firstName: states.firstName,
      lastName: states.lastName,
      email: states.email,
      password: states.password,
    };
    
    addUser(newUser);
    navigate("/dashboard");
}
  const validateFields = () => {
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
    <div>
      <div className="alert">{states.alertWarning}</div>
      <div className="form">
        <div
          className="input"
          defaultValue={states.firstName}
          onChange={(e) => {
            updateStates(`firstName`, e);
          }}
        >
          First Name: <input type="text" />
        </div>
        <div
          className="input"
          defaultValue={states.lastName}
          onChange={(e) => {
            updateStates(`lastName`, e);
          }}
        >
          Last Name: <input type="text" />
        </div>
        <div
          className="input"
          defaultValue={states.email}
          onChange={(e) => {
            updateStates(`email`, e);
          }}
        >
          Email: <input type="email" />
        </div>
        <div
          className="input"
          defaultValue={states.password}
          onChange={(e) => {
            updateStates(`password`, e);
          }}
        >
          Password: <input type="password" />
        </div>
        <div
          className="input"
          defaultValue={states.confirmPassword}
          onChange={(e) => {
            updateStates(`confirmPassword`, e);
          }}
        >
          Confirm Password: <input type="password" />
        </div>
        <button onClick={validateFields}>Sign up</button>
      </div>
    </div>
  );
}

export default Signup;
