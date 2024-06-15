import React, { useEffect, useState } from "react";
import { AxiosDelete, AxiosGet } from "../../Components/crud";
import RootLayout from "../MainLayout";
import Table from "../../Components/Layouts/Table";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ModalTemplates from "../../Components/Layouts/ModalTemplates";

interface EventStates {
  events: any;
}
function Events() {
  const navigate = useNavigate();
  const userSession = sessionStorage.getItem("user");
  const user = userSession ? JSON.parse(userSession) : "";
  const [states, setStates] = React.useState<EventStates>({
    events: [],
  });

  const [showModel, setShowModel] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const deleteEvent = async () => {
    try {
      if (selectedEvent !== null) {
        const res = await AxiosDelete(`events/${selectedEvent}`);
        if (!res.isSuccess) {
          const events = states.events.filter(
            (u: any) => u.id !== selectedEvent
          );
          updateStates("events", events);
          throw new Error(res.message);
        }
        setShowModel(false);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleDelete = (e: number) => {
    setSelectedEvent(e);
    setShowModel(true);
  };

  const headers = [
    {
      id: 5,
      name: "No.",
    },
    {
      id: 0,
      name: "Name",
    },
    {
      id: 1,
      name: "Attendants",
    },
    {
      id: 2,
      name: "Description",
    },
    {
      id: 3,
      name: "Date",
    },
    {
      id: 4,
      name: "Actions",
    },
  ];

  const updateStates = (key: string, value: any) => {
    setStates({
      ...states,
      [key]: value,
    });
  };

  const createClick = () => {
    navigate("/events/create");
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsRes = await AxiosGet("events", {
          user_id: user.id,
        });
        if (eventsRes.length > 0) {
          updateStates("events", eventsRes);
        } else {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEvents();
  }, []);

  const modalData = {
    title: "Delete Event",
    message: "Are you certain you want to remove this event?",
    okText: "Yes, Delete",
    cancelText: "No, Cancel",
  }

  return (
    <RootLayout>
        <ModalTemplates 
            title={modalData.title} 
            message={modalData.message} 
            okText={modalData.okText} 
            cancelText={modalData.cancelText} 
            toggle={showModel} 
            onCancel={()=> setShowModel(false)} 
            onOk={deleteEvent}
        />
        <div className='w-4/5 text-center'>
            <Table createClick={createClick} editUrl="/events" deleteHandler={handleDelete} headers={headers} data={states.events.filter((event : any) => {
                delete event.createdby;
                event.datetime = dayjs(event.datetime).format("DD MMM YYYY");
                return event;
            })}/>
        </div>
    </RootLayout>
  );
}

export default Events;
