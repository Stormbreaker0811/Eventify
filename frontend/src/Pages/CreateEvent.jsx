import React, { useState } from 'react';
import '../Styles/CreateEvent.css';
import Navbar from '../Components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const CreateEvent = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00'); 

  return (
    <div>
      <Navbar/>
      <div className="ce-container">
        <div className="create-event-tag">
            <h2>Create Event</h2>
        </div>
        <div className="event-name">
            <p>Name of the event</p>
            <input
                type='text'
                placeholder='Enter the name of the event'
            />
        </div>
        <div className="dtd">
            <div className="date">
                <p>Date</p>
                <DatePicker selected={date} onChange={(date) => setDate(date)} className='DP'/>
            </div>
            <div className="time">
                <p>Time</p>
                <TimePicker value={time} onChange={setTime} className='TM'/>
            </div>
            <div className="duration">
                <p>Duration</p>
                <input 
                type = "text"
                placeholder='hours'/>
            </div>
        </div>
        <div className="location">
            <p>Location</p>
            <input
            type = 'text'
            placeholder='set location for event'
            />
        </div>

        <div className="guests">
            <p>Guests</p>
            <input
            type='text'
            placeholder='enter name of the guests'
            />
        </div>

        <div className="trailer">
            <p>Trailers/Teasers</p>
            <input
            type='text'
            placeholder='enter the link'
            />
        </div>
        <button className='nxtbtn'>Submit for review</button>
      </div>
    </div>
  )
}

export default CreateEvent;
