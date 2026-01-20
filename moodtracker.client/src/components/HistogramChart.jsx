import { useRef, useState } from "react";
import useFetchGet from "../utilities/useFetchGet";
import {
  formatDate,
  getFirstDayOfCurrentMonth,
  incrementMonth,
  decrementMonth,
} from "../utilities/dateUtils";
import {
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
import HistogramTooltip from "./HistogramTooltip";

const HistogramChart = () => {
  const [date, setDate] = useState(getFirstDayOfCurrentMonth());
  const leftArrow = useRef();
  const rightArrow = useRef();
  const { result: histogram } = useFetchGet(
    `/api/Histogram/GetHistogram/${formatDate(date)}`,
  );

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
      {histogram && (
        <div className="chart">
          <h1 className="header">Histogram</h1>
          <h3 className="date">
            {histogram.month} {histogram.year}
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart
              margin={{ top: 50 }}
              data={histogram.items.map((i) => ({
                name: i.moodRate,
                value: i.count,
              }))}
            >
              <CartesianGrid strokeDasharray="3" vertical={false} />
              <XAxis  dataKey="name"   />
              <YAxis
                dataKey="value"
              />
              <Tooltip content={<HistogramTooltip />} />
              <Bar dataKey="value">
                {histogram.items.map((i) => (
                  <Cell key={i.moodRate} fill={mapColor(i.moodColor)} />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
export default HistogramChart;
