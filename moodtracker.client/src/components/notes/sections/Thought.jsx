const Thought = ({ time, value }) => {
  return (
    <div className="thought-container">
      <div className="time">{time}</div>
      <div className="line"></div>
      <div className="value">{value}</div>
    </div>
  );
};
export default Thought;
