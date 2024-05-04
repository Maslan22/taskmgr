import React from 'react' 
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosGet, AxiosPost, AxiosPut } from '../../Components/crud';
import RootLayout from '../MainLayout';
import FormContainer from '../../Components/Layouts/FormContainer';
import Form from '../../Components/Layouts/Form';

interface CreateUserStates {
    firstname: string,
    lastname: string,
    email: string, 
    password: string,
    confirmPassword: string,
    alertWarning: string
}
function EditUsers() {
    const userSession = sessionStorage.getItem('user');  
    const user = userSession ? JSON.parse(userSession): '';
    const userId = useParams().id;
    const [states, setStates] = React.useState<CreateUserStates>({
        firstname: '',
        lastname: '',
        email: '', 
        password: '',
        confirmPassword: '',
        alertWarning: ''
    });
    
    const updateStates = (key: string, value: any) => {
        setStates({
            ...states,
            [key]: value
        });
    }
    const populateFields = (user: any) => { 
        // updateStates('name', user.name);
        // updateStates('date', user.datetime);
        // updateStates('desc', user.description);
        setStates((prev) => ({
            ...prev,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email, 
        }));  
    }
    React.useEffect(() => { 
        const getUser = async () => {
            try {
                const res = await AxiosGet(`users/${userId}`, {
                    user_id: user.id
                });
                if (res.length > 0) {
                    populateFields(res[0]);
                }else{
                    throw new Error("Something went wrong!");
                }
                }catch (error) {
                    console.error(error);
                }
        }
        getUser();
    },[userId, user.id]);

    const navigate = useNavigate();


    const updateUser = async (user: any) => {
        const res = await AxiosPut(`users/${userId}`, user); 
        if(res.isSuccess) {
            navigate('/users')
        }
    }
    const validateFields = async () => {
        if(states.firstname.length < 1){
            updateStates('alertWarning', "First Name is required");
            return;
        }
        if(states.lastname.length < 1){
            updateStates('alertWarning', "Last Name is required");
            return;
        }
        if(states.email.length < 1){
            updateStates('alertWarning', "Email is required");
            return;
        }
        if(states.password.length < 1){
            updateStates('alertWarning', "Password is required");
            return;
        }
        if(states.confirmPassword.length < 1){
            updateStates('alertWarning', "Confirm password");
            return;
        }
        if(states.password !== states.confirmPassword){
            updateStates('alertWarning', "Passwords do not match");
            return;
        }  
        const newUser = { 
            firstname: states.firstname,
            lastname: states.lastname,
            email: states.email, 
            password: states.password,
            user_id: user.id,
        } 
        await updateUser(newUser);
    }
    const formData = [
        {
            id: 0,
            name: "firstname",
            type: "text",
            placeholder: "Enter First Name",
            title: "First Name",
            setInputState: (value: any) => updateStates('firstname', value),
            defaultValue: states.firstname
        },
        {
            id: 1,
            name: "lastname",
            type: "text",
            placeholder: "Enter Last Name",
            title: "Last Name",
            setInputState: (value: any) => updateStates('lastname', value),
            defaultValue: states.lastname
        },
        {
            id: 2,
            name: "email",
            type: "email",
            title: "Email", 
            setInputState: (value: any) => updateStates('email', value),
            defaultValue: states.email,
            placeholder: "Enter Email"
        },
        {
            id: 3,
            name: "password",
            type: "password",
            title: "Password", 
            setInputState: (value: any) => updateStates('password', value),
            defaultValue: states.password,
            placeholder: "Enter Password"
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            title: "Confirm Password", 
            setInputState: (value: any) => updateStates('confirmPassword', value),
            defaultValue: states.confirmPassword,
            placeholder: "Confirm Password"
        },
    ]
  return (
    <RootLayout>
        <FormContainer>
        <h1 className="font-bold">Edit User</h1>  
          {states.alertWarning?.length !== 0 &&
          <div className="bg-red-400 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertWarning}</div>}
            <Form btnTitle='Edit' formData={formData}  buttonHandler={validateFields}/> 
        </FormContainer>
    </RootLayout>
  )
}

export default EditUsers