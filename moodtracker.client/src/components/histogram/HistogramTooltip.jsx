const CustomTooltip = ({ active, payload, label }) => {
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

export default CustomTooltip;