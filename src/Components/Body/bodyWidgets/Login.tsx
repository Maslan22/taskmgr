import React, { useState } from 'react'
import { Users } from '../../../data';
import { useNavigate } from "react-router-dom";

interface signUpProps  {
    email: string,
    password: string,
    alertWarning?: string
}

function Login() {
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

    const submit = () => {
        Users.filter(user => {
            if(user.email === states.email && user.password === states.password){
                //redirect to dashboard
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
    <div className='w-full bg-sky-600'>
        <div className="alert">{states.alertWarning}</div>
        <div className="form">
            <div className="input" defaultValue={states.email} onChange={(e)=>{updateStates(`email`, e)}}>Email: <input type='email'/></div>
            <div className="input" defaultValue={states.password} onChange={(e)=>{updateStates(`password`, e)}}>Password: <input type='password'/></div>
            <button>Login</button>
            <p className="font-bold text-3xl text-blue-400">hello</p>
        </div>
    </div>
  )
}

export default Login