import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import Day from './Day'
import { useState } from 'react'


import { getWeek } from '../utilities/dateUtils'

export default function Calendar() {
    const [weekReference, setWeekReference ]= useState(0);
    const [week, setWeek ]= useState(getWeek(weekReference));

  const leftClick = () => {
    setWeekReference(prev => --prev)
    setWeek(getWeek(weekReference));
  }

  const rightClick = () => {
    setWeekReference(prev => ++prev)
    setWeek(getWeek(weekReference));
  }  

  return (
    <div className='calendar'>
    <img className="arrow left-arrow" src={"/left-arrow.svg" } onClick={leftClick} />
    <img className="arrow right-arrow" src={"/right-arrow.svg"} onClick={rightClick} />
      {week.map(day => (<Day key={day.name} name={day.name} date={day.date} />))}
    </div>
  )
}