import { useState } from "react";

const MoodRateForm = () => {
  const [moodRate, setMoodRate] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="rate-mood" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="mood-rate">
          Ocena nastroju
        </label>
        <input
          type="number"
          id="mood-rate"
          name="mood-rate"
          min="1"
          max="10"
          value={moodRate}
          onChange={(e) => setMoodRate(e.target.value)}
        ></input>
      </div>

      <button type="submit">Oceń</button>
    </form>
  );
};
export default MoodRateForm;
