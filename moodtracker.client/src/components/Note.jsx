import { useState } from "react"
import { useGlobalStore } from "../utilities/useGlobalStore"

export default function Note({ name, date }) {
  const { setFormActive, setDate, setDayOfTheWeek } = useGlobalStore(); 

  const add = () => {
    setFormActive(true);
    setDayOfTheWeek(name);
    setDate(date);
  }

  return (
    <div className='note'>
        <div className="date">{date}</div>
        <div className="name">{name}</div>
        {/* <div className="moodRate">{moodRate}</div> */}
        <div className="update-btn" onClick={add}>Dodaj</div>
    </div>
  )
}