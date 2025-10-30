import { useState } from "react"

export default function Day({ name, date }) {
  return (
    <div className='day'>
        <div className="date">{date}</div>
        <div className="name">{name}</div>
        
    </div>
  )
}