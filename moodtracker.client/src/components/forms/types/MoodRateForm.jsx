import { useState } from "react";
import { apiRequest } from "../../../utilities/useApi";
import { useGlobalStore } from "../../../utilities/useGlobalStore";

const MoodRateForm = ({ date }) => {
  const [moodRate, setMoodRate] = useState(1);
  const { setFormActive, setUpdateNoteDate } = useGlobalStore(); 

  const onSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await apiRequest('/api/Notes/RateMood','PUT',{
      date: date,
      moodRate: moodRate
    });

    if(isSuccess){
      setFormActive(false);
      setUpdateNoteDate(date);
    }
  }

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
