import React from 'react'
import { Users, addEvent } from '../../data';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosGet, AxiosPost, AxiosPut } from '../../Components/crud';
import RootLayout from '../MainLayout';
import FormContainer from '../../Components/Layouts/FormContainer';
import Form from '../../Components/Layouts/Form';
import dayjs from 'dayjs';

interface CreateEventStates {
    name: string,
    date: string,
    attendees: any,
    users: any,
    desc: string,
    alertWarning: string
}
function EditEvents() {
    const userSession = sessionStorage.getItem('user');  
    const user = userSession ? JSON.parse(userSession): '';
    const eventId = useParams().id;
    const [states, setStates] = React.useState<CreateEventStates>({
        name: '',
        date: '',
        attendees: [],
        users: [],
        desc: '',
        alertWarning: ''
    });
    
    const updateStates = (key: string, value: any) => {
        setStates({
            ...states,
            [key]: value
        });
    }
    const populateFields = (event: any) => { 
        // updateStates('name', event.name);
        // updateStates('date', event.datetime);
        // updateStates('desc', event.description);
        setStates((prev) => ({
            ...prev,
            name: event.name,
            date: dayjs(event.datetime).format('MM/DD/YYYY'),
            desc: event.description
        })); 
    }
    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await AxiosGet("users"); 
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
         
        const getEvent = async () => {
            try {
                const res = await AxiosGet(`events/${eventId}`, {
                    isadmin: user.isadmin,
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
        getEvent();
    },[eventId, user.id]);

    const navigate = useNavigate();


    const updateEvent = async (event: any) => {
        const res = await AxiosPut(`events/${eventId}`, event); 
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
        await updateEvent(newEvent);
    }
    const formData = [
        {
            id: 0,
            name: "name",
            type: "text",
            placeholder: "Enter event name",
            title: "Event Name",
            setInputState: (value: any) => updateStates('name', value),
            defaultValue: states.name
        },
        {
            id: 1,
            name: "desc",
            type: "text",
            placeholder: "Enter event description",
            title: "Event Description",
            setInputState: (value: any) => updateStates('desc', value),
            defaultValue: states.desc
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
            setInputState: (value: any) => updateStates('attendees', value),
            defaultValue: states.attendees
        },
        {
            id: 3,
            name: "date",
            type: "date",
            title: "Event Date",
            setInputState: (value: any) => updateStates('date', value),
            defaultValue: states.date
        }
    ]
  return (
    <RootLayout>
        <FormContainer>
        <h1 className="font-bold">Edit Event</h1>  
          {states.alertWarning?.length !== 0 &&
          <div className="bg-red-400 mt-1 text-sm text-white rounded-sm px-1 py-2">{states.alertWarning}</div>}
            <Form btnTitle='Edit' formData={formData}  buttonHandler={validateFields}/> 
        </FormContainer>
    </RootLayout>
  )
}

export default EditEvents