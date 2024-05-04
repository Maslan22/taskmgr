import React from 'react'
import { Users, addEvent } from '../../data';
import { useNavigate } from 'react-router-dom';

interface CreateEventStates {
    name: string,
    date: string,
    attendees: any,
    users: any,
    desc: string
}
function CreateEvents() {
    const [states, setStates] = React.useState<CreateEventStates>({
        name: '',
        date: '',
        attendees: [],
        users: Users,
        desc: ''
    });

    const navigate = useNavigate();

    const updateStates = (key: string, value: any) => {
        setStates({
            ...states,
            [key]: value
        });
    }

    const validateFields = () => {
        if(states.name.length < 1){
            alert("Name is required");
            return;
        }
        if(states.date.length < 1){
            alert("Date is required");
            return;
        }
        if(states.attendees.length < 1){
            alert("Attendees is required");
            return;
        }
        const attendees = Array.from(states.attendees).map((attendee: any) => {
            return attendee.value;
        });
        const newEvent = {
            id: Math.floor(Math.random() * 1000),
            name: states.name,
            date: states.date,
            attendants: attendees.join(","),
            description: states.desc
        }
        console.log(newEvent);
        addEvent(newEvent);
        navigate('/dashboard')
    }
  return (
    <div>
        <div className="form">
            <div className="input" >Name: <input type='text' defaultValue={states.name} onChange={(e:any)=>{updateStates(`name`, e.target.value)}}/></div>
            <div className="input" >Description: <input type='text' defaultValue={states.desc} onChange={(e:any)=>{updateStates(`desc`, e.target.value)}}/></div>
            <div className="input">Attendees:
            <select multiple onChange={(e:any)=>{ updateStates(`attendees`, e.target.selectedOptions)}}>
                {
                    states.users.map((user: any) => {
                        return <option key={user.id}>{user.firstName + " " + user.lastName}</option>
                    })
                }
            </select>
            </div>
            <div className="input">Date: 
            <input type='date' defaultValue={states.date} onChange={(e:any)=>{updateStates(`date`, e.target.value)}}/>
            </div>
            <button onClick={validateFields}>Create</button> 
        </div>
    </div>
  )
}

export default CreateEvents