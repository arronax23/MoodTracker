const Thought = ({ thought }) => {
  return (
    <div className="thought-container">
      <div className="time">{thought.time}</div>
      <div className="line"></div>
      <div className="text">{thought.text}</div>
    </div>
  );
};
export default Thought;
