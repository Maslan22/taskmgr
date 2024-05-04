import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "../data";
import RootLayout from "./MainLayout";
import { AxiosGet, AxiosPost } from "../Components/crud";
import Form from "../Components/Layouts/Form";
import FormContainer from "../Components/Layouts/FormContainer";

interface signUpProps {
  email: string; 
  alertWarning?: string;
}

function ResetPassword() {
  const navigate = useNavigate();
  const [states, setStates] = useState<signUpProps>({
    email: "", 
    alertWarning: "",
  });

  const formData = [
    {
      id: 0,
      name: "email",
      type: "email",
      placeholder: "Enter your email to reset password",
      title: "Email", 
      setInputState: (value: any) => setStates({ ...states, email: value }),
      defaultValue: states.email,
    }
  ]

  const updateStates = (key: string, value: any) => {
    setStates({
      ...states,
      [key]: value,
    });
  };

  const handleReset = async () => {
    try {
    const res = await AxiosGet(`verify`, {
        email: states.email
    });

    if(res.isSuccess) {
        navigate(`/password-update/${res.id}`);
    }else {
        throw new Error("Something went wrong!");
    }
}catch(e: any) {
    updateStates(`alertWarning`, "Something went wrong. Try again later");
    console.error(e.message);
}
  }

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <RootLayout>
     <FormContainer>
          <h1 className="font-bold">Reset Password</h1>  
          {states.alertWarning?.length !== 0 &&
          <div className="bg-red-400 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertWarning}</div>}
          <Form btnTitle="Reset" buttonHandler={handleReset} formData={formData}/>   
        </FormContainer>
    </RootLayout>
  );
}

export default ResetPassword;
