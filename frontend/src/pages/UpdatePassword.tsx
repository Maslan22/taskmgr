import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Users } from "../data";
import RootLayout from "./MainLayout";
import { AxiosPost, AxiosPut } from "../Components/crud";
import Form from "../Components/Layouts/Form";
import FormContainer from "../Components/Layouts/FormContainer";

interface signUpProps {
  confirmPassword: string;
  password: string;
  alertWarning?: string;
  alertSuccess?: string;
}

function UpdatePassword() {
    const userId = useParams().id;
  const navigate = useNavigate();
  const [states, setStates] = useState<signUpProps>({
    confirmPassword: "",
    password: "",
    alertWarning: "",
    alertSuccess: "",
  });

  const formData = [
    {
      id: 0,
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      title: "password", 
      setInputState: (value: any) => setStates({ ...states, password: value }),
      defaultValue: states.password,
    },
    {
      id: 1,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      title: "Confirm Password", 
      setInputState: (value: any) => setStates({ ...states, confirmPassword: value }),
      defaultValue: states.confirmPassword,
    }
  ]

  const updateStates = (key: string, value: any) => {
    setStates({
      ...states,
      [key]: value,
    });
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const submit = async () => {
    try { 
    const res = await AxiosPut(`reset-password/${userId}`, { 
      password: states.password,
    }); 
    if(res.isSuccess) {
      updateStates(`alertWarning`, "");
      updateStates(`alertSuccess`, "Password updated successfully");
    }else{
      throw new Error(res.message);
    }
    }catch (error : any) {
      updateStates(`alertWarning`, "Invalid email or password")
      console.error(error);
    }
  };
 

  const validateFields = () => {
    states.password.length < 8
      ? updateStates(`alertWarning`, `Password must be at least 8 characters`)
      : states.password !== states.confirmPassword
      ? updateStates(`alertWarning`, `Password do not match`)
      : submit();
  };

  return (
    <RootLayout>
     <FormContainer>
          <h1 className="font-bold">Update Password</h1>  
          {states.alertWarning?.length !== 0 &&
          <div className="bg-red-400 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertWarning}</div>}
          {states.alertSuccess?.length !== 0 &&
          <div className="bg-green-500 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertSuccess}</div>}
          <Form btnTitle="Update" buttonHandler={validateFields} formData={formData}/>   
        </FormContainer>
    </RootLayout>
  );
}

export default UpdatePassword;
