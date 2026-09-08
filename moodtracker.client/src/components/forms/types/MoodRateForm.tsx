import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utilities/useApi";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import useFetchGet from "../../../utilities/useFetchGet";

const MoodRateForm = ({ date } : { date: Date }) => {
  const { result: moodRate, setResult: setMoodRate } = useFetchGet<number | string>(
    `/api/Notes/GetMoodRate/${date}`
  ); 
  const { setUpdatedNoteDate } = useGlobalStore(); 
  const navigate = useNavigate();

  const submit = async () => {
    const isSuccess = await apiRequest('/api/Notes/RateMood', 'PUT', {
      date: date,
      moodRate: Number(moodRate),
    });

    if (isSuccess) {
      setUpdatedNoteDate(date);
      navigate(-1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMoodRate(value === "" ? "" : Number(value));
  };

  return (
    <form className="rate-mood" action={submit}>
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
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Oceń</button>
    </form>
  );
};

export default MoodRateForm;