import { TooltipProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

export interface HistogramTooltipProps extends TooltipProps<number | string, string> {
  active?: boolean;
  payload?: Array<Payload>;
  label?: number | string;
}

const HistogramTooltip = ({ active, payload, label }: HistogramTooltipProps) => {
  if (!active || !payload?.length) return null;

  // Pierwszy payload to słupek (Bar)
  const value = payload[0].value;

  return (
    <div style={{ background: "white", padding: 10, border: "1px solid #ccc" }}>
      <p>Ocena: {label}</p>
      <p>Ilość: {value}</p>
    </div>
  );
};

export default HistogramTooltip;



