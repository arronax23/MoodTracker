import Note from "./notes/Note";
import { useState, useRef } from "react";
import { getWeek } from "../utilities/dateUtils";
import { Outlet } from "react-router";

export default function Calendar() {
  const [weekReference, setWeekReference] = useState(0);
  const [week, setWeek] = useState(getWeek(weekReference));
  const calendar = useRef();

  const moveToPreviousWeek = () => {
    setWeekReference(prev => {
      setWeek(getWeek(--prev));
      return prev;
    });
    blink();
  };

  const moveToNextWeek = () => {
    setWeekReference(prev => {
      setWeek(getWeek(++prev));
      return prev;
    });
    blink();
  };


  const blink = () => {
    calendar.current.classList.add('blink');
    setTimeout(() => {
      calendar.current.classList.remove('blink');
    }, 250);
  }

  return (
    <div>
      <Outlet />
      <div className="calendar" ref={calendar}>
        <img
          className="arrow left-arrow"
          src={"/left-arrow.svg"}
          onClick={moveToPreviousWeek}
        />
        <img
          className="arrow right-arrow"
          src={"/right-arrow.svg"}
          onClick={moveToNextWeek}
        />
        {week.map((day) => (
          <Note
            key={day.name}
            dayName={day.name}
            dateDisplay={day.dateDisplay}
            date={day.date}
            isToday = {day.isToday}
          />
        ))}
      </div>
    </div>
  );
}
