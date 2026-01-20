const MoodChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  // Pierwszy payload to słupek (Bar)
  const value = payload[0].value;

  return (
    <div style={{ background: "white", padding: 10, border: "1px solid #ccc" }}>
      <p>Dzień: {label}</p>
      <p>Ocena: {value}</p>
    </div>
  );
};

export default MoodChartTooltip;