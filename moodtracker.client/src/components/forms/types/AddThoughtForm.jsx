import { useState } from "react";
import { apiRequest } from "../../../utilities/useApi";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import { useNavigate } from "react-router-dom";
import { getLocalTime } from "../../../utilities/dateUtils"

const AddThoughtForm = ({ date }) => {
  const [thoughtText, setThoughtText] = useState('');
  const [time, setTime] = useState(getLocalTime());
  const { setUpdatedNoteDate } = useGlobalStore(); 
  const navigate = useNavigate();
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const thought = {
      time: time,
      text: thoughtText
    }

    const isSuccess = await apiRequest('/api/Notes/AddThought','PUT',{
      date: date,
      thought: thought
    });

    if(isSuccess) {
      setUpdatedNoteDate(date);
      navigate(-1);
    }
  }

  return (
    <form className="add-thought" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="time">
          Czas
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        ></input>
      </div>

      <div className="form-item">
        <label htmlFor="thought">
          Myśl
        </label>
        <textarea
          id="thought"
          name="thought"
          value={thoughtText}
          onChange={(e) => setThoughtText(e.target.value)}
        ></textarea>
      </div>      
         

      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddThoughtForm;
