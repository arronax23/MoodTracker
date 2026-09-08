import { ChangeEvent, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import useFetchGet from "../../utilities/useFetchGet";
import { apiRequest } from "../../utilities/useApi";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import { ThoughtItem } from "../../types/note";

export interface EditThoughtFormProps {
  noteDate: string;
  noteId: number;
  thoughtId: number;
}

const EditThoughtForm = ({ noteDate, noteId, thoughtId }: EditThoughtFormProps) => {
  const { result: thought, setResult: setThought } = useFetchGet<ThoughtItem>(
    `/api/Notes/GetThought/${noteId}/${thoughtId}`
  );
  const navigate = useNavigate();
  const { setUpdatedNoteDate } = useGlobalStore();

  const setTime = (newTime: string) => {
    setThought((prev) => (prev ? { ...prev, time: newTime } : prev));
  };

  const setThoughtText = (newText: string) => {
    setThought((prev) => (prev ? { ...prev, text: newText } : prev));
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!thought) return;

    const isSuccess = await apiRequest(
      "/api/Notes/EditThought",
      "PATCH",
      {
        noteId: noteId,
        thought: thought,
      }
    );

    if (isSuccess) {
      setUpdatedNoteDate(noteDate);
      navigate(-1);
    }
  };

  if (!thought) return null;

  return (
    <form className="edit-medication" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="time">Czas</label>
        <input
          type="time"
          id="time"
          name="time"
          value={thought.time}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="thought">Myśl</label>
        <textarea
          id="thought"
          name="thought"
          value={thought.text}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setThoughtText(e.target.value)}
        />
      </div>

      <button type="submit">Edytuj</button>
    </form>
  );
};

export default EditThoughtForm;