import { useEffect, useState } from "react"
import { Events, modifyEvent } from "../data"
import RootLayout from "./MainLayout"
import { useNavigate } from "react-router-dom"

interface EventStates {
    lastName: string,
    firstName: string
    events: any
}

const Dashboard = () => {
    const userSession = sessionStorage.getItem('user'); 
    const user = userSession ? JSON.parse(userSession): ''; 
    const [states, setStates] = useState<EventStates>({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        events: Events
    });

    
    const navigate = useNavigate();
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if(!user){
            navigate("/");
        }
    },[navigate]);
    const addToAttendees = (event : any) => {
        event["attendants"] = event["attendants"] + "," + states.firstName + " " + states.lastName;
        console.log(event);
        modifyEvent(event); 
    }
    const isAttendee = (attendees: any) => {
        const attendeesArr = attendees.split(",");
        return attendeesArr.includes(states.firstName + " " + states.lastName);
    }
  return (
    <RootLayout>
        <h3>Welcome {states.firstName + " " + states.lastName}</h3>
        {
        states.events.map((event: any) => {
            return( 
            <div key={event.id}>
                <p>{event.name}</p> 
                <p>{event.description}</p>
                <p>{event.date}</p>
                {!isAttendee(event.attendants) &&
                <button onClick={() => addToAttendees(event)}>Join</button>}
                </div>)
        })
    }
    </RootLayout>
  )
}

export default Dashboard