import useFetchGet from "../../../utilities/useFetchGet";
import { formatDate } from "../../../utilities/dateUtils";
import { mapColor, translateColorToPolish } from "../../../utilities/colorUtils";
import HistogramTooltip from "../HistogramTooltip";

export interface Histogram {
  month: string;
  year: number;
  items: {
    moodColor: string;
    moodRate: number;
    count: number;
  }[];
}

import {
  ComposedChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const MoodColorHistogram = ({ date }: { date: Date }) => {
  const { result: histogram } = useFetchGet<Histogram>(
    `/api/Histogram/GetMoodColorHistogram/${formatDate(date)}`,
  );

  return (
    <div>
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
                name: translateColorToPolish(i.moodColor),
                value: i.count,
              }))}
            >
              <CartesianGrid strokeDasharray="3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
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
export default MoodColorHistogram;
