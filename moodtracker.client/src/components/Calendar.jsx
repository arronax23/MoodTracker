import Note from './notes/Note'
import { useState } from 'react'


import { getWeek } from '../utilities/dateUtils'

export default function Calendar() {
    const [weekReference, setWeekReference ]= useState(0);
    const [week, setWeek ]= useState(getWeek(weekReference));
    const [notes, setNotes ]= useState(getWeek([]));


  const leftClick = () => {
    setWeekReference(prev => --prev)
    setWeek(getWeek(weekReference));
  }

  const rightClick = () => {
    setWeekReference(prev => ++prev)
    setWeek(getWeek(weekReference));
  }  

  const updateNote = (date) => {
    alert(date);
  }    



  return (
    <div className='calendar'>
    <img className="arrow left-arrow" src={"/left-arrow.svg" } onClick={leftClick} />
    <img className="arrow right-arrow" src={"/right-arrow.svg"} onClick={rightClick} />
      {week.map(day => (<Note key={day.name} dayName={day.name} date={day.date} update={updateNote} />))}
    </div>
  )
}