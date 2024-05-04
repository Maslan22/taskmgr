import React from 'react'
import { modifyEvent } from '../../data';
import postgres from 'postgres';

interface EventStates {
    events: any
}
function Events() {
    let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

    const [states, setStates] = React.useState<EventStates>({
        events: Events
    });
    const editEvent = (event: any) => {
        // modifyEvent(event);
    }
    const deleteEvent = (event: any) => {
        console.log("Delete Event");
    }

  return (
    <div>{
        states.events.map((event: any) => {
            return( 
            <div key={event.id}>
                <p>{event.name}</p> 
                <p>{event.attendants}</p> 
                <p>{event.description}</p>
                <p>{event.date}</p> 
                <button onClick={() => editEvent(event)}>Edit</button>
                <button onClick={() => deleteEvent(event)}>Delete</button>
            </div>)
        })}
    </div>
  )
}

export default Events