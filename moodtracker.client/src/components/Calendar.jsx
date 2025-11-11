import Note from "./notes/Note";
import { useState } from "react";
import { getWeek } from "../utilities/dateUtils";
import { Outlet } from "react-router";

export default function Calendar() {
  const [weekReference, setWeekReference] = useState(0);
  const [week, setWeek] = useState(getWeek(weekReference));

  const moveToPreviousWeek = () => {
    setWeekReference((prev) => --prev);
    setWeek(getWeek(weekReference));
  };

  const moveToNextWeek = () => {
    setWeekReference((prev) => ++prev);
    setWeek(getWeek(weekReference));
  };

  return (
    <div>
      <Outlet />
      <div className="calendar">
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
          />
        ))}
      </div>
    </div>
  );
}
