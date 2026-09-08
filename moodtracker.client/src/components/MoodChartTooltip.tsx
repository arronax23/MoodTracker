import { TooltipProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

export interface TooltipPayloadItem {
  value?: number | string;
  name?: string;
  dataKey?: string | number;
  payload?: {
    day?: number | string;
    moodRate?: number;
    moodColor?: string;
  };
}

export interface CustomTooltipProps extends TooltipProps<number | string, string> {
  active?: boolean;
  payload?: Array<Payload>;
  label?: number | string;
}

const MoodChartTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const moodRate = payload[0].payload.value;

  return (
    <div style={{ background: "white", padding: 10, border: "1px solid #ccc", borderRadius: 4 }}>
      <p style={{ margin: 0, fontWeight: "bold" }}>Dzień: {label}</p>
      <p style={{ margin: "4px 0 0 0" }}>Ocena: {moodRate}</p>
    </div>
  );
};

export default MoodChartTooltip;