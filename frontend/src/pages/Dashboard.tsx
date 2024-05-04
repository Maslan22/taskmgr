import { useEffect, useState } from "react"
import { Events, modifyEvent } from "../data"
import RootLayout from "./MainLayout"
import { useNavigate } from "react-router-dom"
import { AxiosGet, AxiosPut } from "../Components/crud"
import Card from "../Components/Layouts/Card"

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
        events: []
    });

    // const cardData = [
    //   {
    //     id: 0,
    //     title: states.events.name,
    //     description: states.events.description,
    //     btnClick: () => console.log("Events")
    //   },
    //   {
    //     id: 1,
    //     title: states.events.name,
    //     description: states.events.description,
    //     btnClick: () => console.log("Events")
    //   },
    //   {
    //     id: 2,
    //     title: "Events",
    //     description: states.events,
    //     btnClick: () => console.log("Events")
    //   }
    // ]

    const updateStates = (key: string, value: any) => {
        setStates({
          ...states,
          [key]: value,
        });
      };

      
      useEffect(() => {
        const getEvents = async () => {
            try { 
                const eventsRes = await AxiosGet("events", {
                  user_id: user.id
                }); 
                if (eventsRes.length > 0) {
                  updateStates("events", eventsRes); 
                }else{
                  throw new Error("Something went wrong!");
                }
                }catch (error) {
                  console.error(error);
                }
        }
        getEvents();
    },[]);
    const navigate = useNavigate();
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if(!user){
            navigate("/");
        }
    },[navigate]);
    const addToAttendees = async (event : any) => {
        event["attendants"] = event["attendants"] + "," + states.firstName + " " + states.lastName;
        try {
            const res = await AxiosPut("events", states.events);
            if (res.isSuccess) {
              //added successfully
            }else{
              throw new Error("Something went wrong!");
            }
            }catch (error) {
              console.error(error);
            }
    }
    const isAttendee = (attendees: any) => {
        const attendeesArr = attendees.split(",");
        return attendeesArr.includes(states.firstName + " " + states.lastName);
    }
  return (
    <RootLayout>
    <div className="mt-10 flex flex-wrap justify-center space-x-5 space-y-5">{
        states.events.map((card: any) => {
            return( 
            <Card isAttendee={isAttendee(card.attendants)} btnTitle="Join" key={card.id} title={card.name} date={card.date} description={card.description} btnClick={async () => addToAttendees}/>
            )
        })} 
    </div>
    </RootLayout>
  )
}

export default Dashboard