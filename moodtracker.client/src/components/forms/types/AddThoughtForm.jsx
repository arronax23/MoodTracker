import { useState } from "react";
import { apiRequest } from "../../../utilities/useApi";
import { useGlobalStore } from "../../../utilities/useGlobalStore";

const AddThoughtForm = ({ date }) => {
  const [thoughtText, setThoughtText] = useState('');
  const [time, setTime] = useState('');
  const { setFormActive, setUpdateNoteDate } = useGlobalStore(); 

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
      setFormActive(false);
      setUpdateNoteDate(date);
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
        <input
          type="text"
          id="thought"
          name="thought"
          value={thoughtText}
          onChange={(e) => setThoughtText(e.target.value)}
        ></input>
      </div>      
         

      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddThoughtForm;
