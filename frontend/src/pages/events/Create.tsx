import React, { useState } from 'react'
import { Users, addEvent } from '../../data';
import { useNavigate } from 'react-router-dom';
import { AxiosGet, AxiosPost } from '../../Components/crud';
import RootLayout from '../MainLayout';
import FormContainer from '../../Components/Layouts/FormContainer';
import Form from '../../Components/Layouts/Form';
import ModalTemplates from '../../Components/Layouts/ModalTemplates';

interface CreateEventStates {
    name: string,
    date: string,
    attendees: any,
    users: any,
    desc: string,
    alertWarning: string
}
function CreateEvents() {
    const userSession = sessionStorage.getItem('user');  
    const user = userSession ? JSON.parse(userSession): '';
    const [states, setStates] = React.useState<CreateEventStates>({
        name: '',
        date: '',
        attendees: [],
        users: [],
        desc: '',
        alertWarning: ''
    });

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await AxiosGet("users");
                console.log(res);
                if (res.length > 0) {
                    updateStates("users", res);
                }else{
                  throw new Error("Something went wrong!");
                }
                }catch (error) {
                  console.error(error);
                }
        }
        getUsers();
    },[]);

    const navigate = useNavigate();

    const updateStates = (key: string, value: any) => {
        setStates({
            ...states,
            [key]: value
        });
    }

    const postEvent = async (event: any) => {
        const res = await AxiosPost("events", event); 
        if(res.isSuccess) {
            navigate('/events')
        }
    }
    const validateFields = async () => {
        if(states.name.length < 1){
            updateStates('alertWarning', "Name is required");
            return;
        }
        if(states.date.length < 1){
            updateStates('alertWarning', "Date is required");
            return;
        }
        if(states.attendees.length < 1){
            updateStates('alertWarning', "Attendees is required");
            return;
        }
        const attendees = Array.from(states.attendees).map((attendee: any) => {
            return attendee.value;
        }); 
        const newEvent = { 
            name: states.name,
            datetime: states.date,
            attendants: attendees.join(","),
            description: states.desc,
            user_id: user.id
        } 
        await postEvent(newEvent);
    }
    const formData = [
        {
            id: 0,
            name: "name",
            type: "text",
            placeholder: "Enter event name",
            title: "Event Name",
            setInputState: (value: any) => updateStates('name', value)
        },
        {
            id: 1,
            name: "desc",
            type: "text",
            placeholder: "Enter event description",
            title: "Event Description",
            setInputState: (value: any) => updateStates('desc', value)
        },
        {
            id: 2,
            name: "attendees",
            type: "select",
            title: "Attendees", 
            options: states.users.map((user: any) => {
                return {
                    id: user.id,
                    name: user.firstname + " " + user.lastname
                }
            }),
            setInputState: (value: any) => updateStates('attendees', value)
        },
        {
            id: 3,
            name: "date",
            type: "date",
            title: "Event Date",
            setInputState: (value: any) => updateStates('date', value)
        }
    ]
    
    const modalData = {
        title: 'Create Event',
        message: 'Are you sure you want to create this event?',
        ok: 'Yes, Create',
        cancel: 'No, Cancel'
    }
    const [showModel, setShowModel] = useState<boolean>(false); 

    const handleSave = () => {
    setShowModel(true);
}
    const createFunc = () => {
        handleSave();
    }

  return (
    // <div>
    //     <div className="form">
    //         <div className="input" >Name: <input type='text' defaultValue={states.name} onChange={(e:any)=>{updateStates(`name`, e.target.value)}}/></div>
    //         <div className="input" >Description: <input type='text' defaultValue={states.desc} onChange={(e:any)=>{updateStates(`desc`, e.target.value)}}/></div>
    //         <div className="input">Attendees:
    //         <select multiple onChange={(e:any)=>{ updateStates(`attendees`, e.target.selectedOptions)}}>
    //             {
    //                 states.users.map((user: any) => {
    //                     return <option key={user.id}>{user.firstName + " " + user.lastName}</option>
    //                 })
    //             }
    //         </select>
    //         </div>
    //         <div className="input">Date: 
    //         <input type='date' defaultValue={states.date} onChange={(e:any)=>{updateStates(`date`, e.target.value)}}/>
    //         </div>
    //         <button onClick={validateFields}>Create</button> 
    //     </div>
    // </div>
    <RootLayout>
        <FormContainer>
        <ModalTemplates 
                title={modalData.title} 
                message={modalData.message} 
                okText={modalData.ok} 
                cancelText={modalData.cancel} 
                toggle={showModel} 
                onCancel={()=> setShowModel(false)} 
                onOk={() => {
                    modalData.title === 'Create Event' ? validateFields() : setShowModel(false)
                }}
            />
        <h1 className="font-bold">New Event</h1>  
          {states.alertWarning?.length !== 0 &&
          <div className="bg-red-400 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertWarning}</div>}
            <Form btnTitle='Create' formData={formData}  buttonHandler={createFunc}/> 
        </FormContainer>
    </RootLayout>
  )
}

export default CreateEvents