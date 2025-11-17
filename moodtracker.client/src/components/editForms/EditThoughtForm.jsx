import { useNavigate } from "react-router-dom";
import useFetchGet from "../../utilities/useFetchGet";
import { apiRequest } from "../../utilities/useApi";
import { useGlobalStore } from "../../utilities/useGlobalStore";

const EditThoughtForm = ({noteDate, noteId, thoughtId }) => {
  const { result: thought, setResult: setThought } = useFetchGet(`/api/Notes/GetThought/${noteId}/${thoughtId}`);
  const navigate = useNavigate();
  const { updatedNoteDate, setUpdatedNoteDate } = useGlobalStore();
  
  const setTime = async (newTime) => {
    setThought(prev => ({...prev, time: newTime}))
  }

  const setThoughtText = async (newText) => {
    setThought(prev => ({...prev, text: newText}))
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await apiRequest('/api/Notes/EditThought','PATCH',{
      noteId: noteId,
      thought: thought
    });
    
    if (isSuccess) {
      setUpdatedNoteDate(noteDate);
      navigate(-1);
    }
  }

  return (
    thought && (
    <form className="edit-medication" onSubmit={onSubmit}>

      <div className="form-item">
        <label htmlFor="time">
          Czas
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={thought.time}
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
          value={thought.text}
          onChange={(e) => setThoughtText(e.target.value)}
        ></textarea>
      </div>      

      <button type="submit">Edytuj</button>
    </form>
  ));
};
export default EditThoughtForm;
