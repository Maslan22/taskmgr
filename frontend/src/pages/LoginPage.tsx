import React, { useEffect, useState } from 'react' 
import { useNavigate } from "react-router-dom";
import { Users } from '../data';
import RootLayout from './MainLayout';

interface signUpProps  {
    email: string,
    password: string,
    alertWarning?: string
}

function LoginPage() {
    const navigate = useNavigate();
    const [states, setStates] = useState<signUpProps>({
        email: '',
        password: '',
        alertWarning: ''
    })

    const updateStates = (key: string, value: any) => {
        setStates({
            ...states,
            [key]: value
        });
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if(user){
            navigate("/dashboard");
        }
    },[navigate]);

    const submit = () => {
        Users.forEach(user => {
            if(user.email === states.email && user.password === states.password){
                //redirect to dashboard
                sessionStorage.setItem("user", JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin
                })); 
                navigate('/dashboard');
            }else {
                updateStates(`alertWarning`, `Invalid email or password`);
            }
        })
    }


    const validateFields = () => {
        states.email.length < 5
        ? updateStates(`alertWarning`, `Email must be at least 5 characters`)
        : states.password.length < 8
        ? updateStates(`alertWarning`, `Password must be at least 8 characters`)
        : submit();
    }

  return (
    <RootLayout>
    <div className='w-full bg-sky-600'>
        <div className="alert">{states.alertWarning}</div>
        <div className="form">
            <div className="input" defaultValue={states.email} onChange={(e:any)=>{updateStates(`email`, e.target.value)}}>Email: <input type='email'/></div>
            <div className="input" defaultValue={states.password} onChange={(e:any)=>{updateStates(`password`, e.target.value)}}>Password: <input type='password'/></div>
            <button onClick={validateFields}>Login</button>
            <p className="font-bold text-3xl text-blue-400">hello</p>
        </div>
    </div>
    </RootLayout>
  )
}

export default LoginPage