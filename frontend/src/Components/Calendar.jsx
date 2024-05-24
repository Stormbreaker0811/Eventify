import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const Calendar = () => {

  const [events,setEvents] = useState([]);
  const [rawEvents,setRawEvents] = useState([]);

  axios.defaults.baseURL = 'http://localhost:4000';

  const name = String(sessionStorage.getItem("Name") || "");
  console.log(name);

  const Name = {
    user_name: name
  }

  // useEffect(() => {
  //   axios.get('/get-orders',{
  //     params: { name }
  //   }).then((res) => {
  //     if(res.status === 200){
  //       setRawEvents(res.data);
  //       const event_data = rawEvents.map(event => {
  //         const [day,month,year] = event.date.split('/');
  //         const startDate = new Date(year,month-1,day);
  //         return {
  //           title: event.name,
  //           start: startDate
  //         }
  //       });
  //       setEvents(event_data);
  //     }
  //   })
  // },[])


  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", 
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        height={"90vh"}
      />
    </div>
  );
}

export default Calendar;