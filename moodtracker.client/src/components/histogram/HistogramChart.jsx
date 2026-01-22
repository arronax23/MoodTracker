import { useRef, useState } from "react";

import {
  getFirstDayOfCurrentMonth,
  incrementMonth,
  decrementMonth,
} from "../../utilities/dateUtils";

import SelectHistogramType from "./SelectHistogramType";
import MoodRateHistogram from "./types/MoodRateHistogram";
import MoodColorHistogram from "./types/MoodColorHistogram";

const HistogramChart = () => {
  const [date, setDate] = useState(getFirstDayOfCurrentMonth());
  const [type, setType] = useState("mood-rate");
  
  const leftArrow = useRef();
  const rightArrow = useRef();


  const blink = (arrowRef) => {
    arrowRef.current.classList.add("blink");
    setTimeout(() => {
      arrowRef.current.classList.remove("blink");
    }, 250);
  };

  const increment = () => {
    const newDate = incrementMonth(date);
    blink(rightArrow);
    setDate(newDate);
  };

  const decrement = () => {
    const newDate = decrementMonth(date);
    blink(leftArrow);
    setDate(newDate);
  };

  return (
    <div className="mood-chart">
      <img
        ref={leftArrow}
        className="arrow left-arrow"
        src={"/left-arrow.svg"}
        onClick={decrement}
      />
      <img
        ref={rightArrow}
        className="arrow right-arrow"
        src={"/right-arrow.svg"}
        onClick={increment}
      />
      <SelectHistogramType setType={setType} />
      {type === "mood-rate" && <MoodRateHistogram date={date} />}
      {type === "mood-color" && <MoodColorHistogram date={date} />}
    </div>
  );
};
export default HistogramChart;
