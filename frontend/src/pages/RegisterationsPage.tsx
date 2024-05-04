import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../data";
import RootLayout from "./MainLayout";
import { AxiosPost } from "../Components/crud";
import FormContainer from "../Components/Layouts/FormContainer";
import Form from "../Components/Layouts/Form";

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

  const formData = [
    {
      id: 3,
      name: "firstName",
      type: "firstName",
      placeholder: "Enter your first name",
      title: "First Name", 
      setInputState: (value: any) => setStates({ ...states, firstName: value }),
      defaultValue: states.firstName,
    },
    {
      id: 4,
      name: "LastName",
      type: "lastName",
      placeholder: "Enter your last name",
      title: "Last Name", 
      setInputState: (value: any) => setStates({ ...states, lastName: value }),
      defaultValue: states.lastName,
    },
    {
      id: 0,
      name: "email",
      type: "text",
      placeholder: "Enter your email",
      title: "Email", 
      setInputState: (value: any) => setStates({ ...states, email: value }),
      defaultValue: states.email,
    },
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      title: "Password", 
      setInputState: (value: any) => setStates({ ...states, password: value }),
      defaultValue: states.password,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      title: "Confirm Password", 
      setInputState: (value: any) => setStates({ ...states, confirmPassword: value }),
      defaultValue: states.confirmPassword,
    }
  ]

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const submit = async () => {
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      firstname: states.firstName,
      lastname: states.lastName,
      email: states.email,
      password: states.password,
      isadmin: false,
    };

    try {
      const res = await AxiosPost("register", newUser);
      if (res.isSuccess) { 
        sessionStorage.setItem("user", JSON.stringify({
            id: res.data.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            isadmin: newUser.isadmin
        })); 
        navigate("/dashboard");
      }else{
        throw new Error("Something went wrong!");
      }
      }catch (error) {
        console.error(error);
      }
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
      {/* <div>
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
      </div> */}
      <FormContainer>
          <h1 className="font-bold">Sign Up</h1>  
          {states.alertWarning?.length !== 0 &&
          <div className="bg-red-400 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertWarning}</div>}
          <Form btnTitle="Sign Up" buttonHandler={validateFields} formData={formData}/> 
          <div className="text-gray-400 text-sm mt-2">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </FormContainer>
    </RootLayout>
  );
}

export default RegistrationsPage;
