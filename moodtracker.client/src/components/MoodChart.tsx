import { useState, useRef } from "react";
import useFetchGet from "../utilities/useFetchGet";
import MoodChartTooltip from "./MoodChartTooltip";
import {
  getFirstDayOfCurrentMonth,
  formatDate,
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

// 1. Definicje interfejsów dla danych z API
export type MoodColor = "Green" | "Yellow" | "Red" | string;

export interface MoodProgressItem {
  day: number | string;
  moodRate: number;
  moodColor: MoodColor;
}

export interface MoodProgressResponse {
  month: string;
  year: number;
  progress: MoodProgressItem[];
}

// Interfejs danych przekazywanych bezpośrednio do wykresu Recharts
export interface ChartDataItem {
  name: number | string;
  value: number;
  color: MoodColor;
}

const MoodChart = () => {
  const [date, setDate] = useState<Date>(getFirstDayOfCurrentMonth());
  
  const leftArrow = useRef<HTMLImageElement>(null);
  const rightArrow = useRef<HTMLImageElement>(null);

  const { result: moodProgress } = useFetchGet<MoodProgressResponse>(
    `/api/MoodProgress/GetProgress/${formatDate(date)}`
  );

  const blink = (arrowRef: React.RefObject<HTMLImageElement | null>) => {
    if (arrowRef.current) {
      arrowRef.current.classList.add("blink");
      setTimeout(() => {
        arrowRef.current?.classList.remove("blink");
      }, 250);
    }
  };

  const mapColor = (color: MoodColor): string => {
    switch (color) {
      case "Green":
        return "#A2EF44";
      case "Yellow":
        return "#FCD47D";
      case "Red":
        return "#B23256";
      default:
        return "#000000";
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

  const chartData: ChartDataItem[] = moodProgress
    ? moodProgress.progress.map((p) => ({
        name: p.day,
        value: p.moodRate,
        color: p.moodColor,
      }))
    : [];

  return (
    <div className="mood-chart">
      <img
        ref={leftArrow}
        className="arrow left-arrow"
        src="/left-arrow.svg"
        alt="Poprzedni miesiąc"
        onClick={decrement}
      />
      <img
        ref={rightArrow}
        className="arrow right-arrow"
        src="/right-arrow.svg"
        alt="Następny miesiąc"
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
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 10]}
                ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                interval={0}
              />
              <Tooltip content={<MoodChartTooltip />} />
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