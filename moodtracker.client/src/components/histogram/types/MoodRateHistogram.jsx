import useFetchGet from "../../../utilities/useFetchGet";
import { formatDate } from "../../../utilities/dateUtils";
import { mapColor } from "../../../utilities/colorUtils";
import HistogramTooltip from "./../HistogramTooltip";

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


const MoodRateHistogram = ({ date }) => {
  const { result: histogram } = useFetchGet(
    `/api/Histogram/GetMoodRateHistogram/${formatDate(date)}`,
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
                name: i.moodRate,
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
export default MoodRateHistogram;
