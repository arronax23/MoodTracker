import { apiRequest } from "../../../utilities/useApi";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import { useNavigate } from "react-router-dom";
import useFetchGet from "../../../utilities/useFetchGet";

const MoodRateForm = ({ date }) => {
  const { result: moodRate, setResult: setMoodRate } = useFetchGet(`/api/Notes/GetMoodRate/${date}`);  
  const { setUpdatedNoteDate } = useGlobalStore(); 
  const navigate = useNavigate();
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await apiRequest('/api/Notes/RateMood','PUT',{
      date: date,
      moodRate: moodRate
    });

    if(isSuccess){
      setUpdatedNoteDate(date);
      navigate(-1)
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
          value={moodRate ?? 1}
          onChange={(e) => setMoodRate(e.target.value)}
        ></input>
      </div>

      <button type="submit">Oceń</button>
    </form>
  );
};
export default MoodRateForm;
