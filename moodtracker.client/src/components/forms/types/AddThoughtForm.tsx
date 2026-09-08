import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utilities/useApi";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import { getLocalTime } from "../../../utilities/dateUtils";

interface Thought {
  time: string;
  text: string;
}

const AddThoughtForm = ({ date }: { date: Date }) => {
  const { setUpdatedNoteDate } = useGlobalStore();
  const navigate = useNavigate();

  const submit = async (formData: FormData) => {
    const time = formData.get("time") as string;
    const thoughtText = formData.get("thought") as string;

    const thought: Thought = {
      time: time,
      text: thoughtText,
    };

    const isSuccess = await apiRequest("/api/Notes/AddThought", "PUT", {
      date: date,
      thought: thought,
    });

    if (isSuccess) {
      setUpdatedNoteDate(date);
      navigate(-1);
    }
  };

  return (
    <form className="add-thought" action={submit}>
      <div className="form-item">
        <label htmlFor="time">Czas</label>
        <input
          type="time"
          id="time"
          name="time"
          defaultValue={getLocalTime()}
        />
      </div>

      <div className="form-item">
        <label htmlFor="thought">Myśl</label>
        <textarea id="thought" name="thought" />
      </div>

      <button type="submit">Dodaj</button>
    </form>
  );
};

export default AddThoughtForm;
