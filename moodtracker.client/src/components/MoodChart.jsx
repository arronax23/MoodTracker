import useFetchGet from "../utilities/useFetchGet";
import { useState, useRef } from "react";
import CustomTooltip from "./CustomTooltip";
import {
  getFirstDayOfCurrentMonth,
  formatDate,
  incrementMonth,
  decrementMonth,
} from "../utilities/dateUtils";

import {
  BarChart,
  ComposedChart,
  Line,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MoodChart = () => {
  const [date, setDate] = useState(getFirstDayOfCurrentMonth());
  const leftArrow = useRef();
  const rightArrow = useRef();
  const { result: moodProgress } = useFetchGet(
    `/api/MoodProgress/GetProgress/${formatDate(date)}`
  );

  const blink = (arrowRef) => {
    arrowRef.current.classList.add("blink");
    setTimeout(() => {
      arrowRef.current.classList.remove("blink");
    }, 250);
  };

  const mapColor = (color) => {
    switch (color) {
      case "Green":
        return "#A2EF44";
      case "Yellow":
        return "#FCD47D";
      case "Red":
        return "#B23256";
      default:
        "#000";
    }
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
      {moodProgress && (
        <div className="chart">
          <h1 className="header">Wykres nastroju</h1>
          <h3 className="date">
            {moodProgress.month} {moodProgress.year}
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart
              margin={{ top: 50 }}
              data={moodProgress.progress.map((p) => ({
                name: p.day,
                value: p.moodRate,
                color: p.moodColor,
              }))}
            >
              <CartesianGrid strokeDasharray="3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 10]}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value">
                {moodProgress.progress.map((p) => (
                  <Cell key={p.day} fill={mapColor(p.moodColor)} />
                ))}
              </Bar>
              <Line
                type="linear"
                dataKey="value"
                stroke="#000"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
export default MoodChart;
