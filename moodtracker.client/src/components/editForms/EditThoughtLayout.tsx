import { useNavigate, useParams } from "react-router-dom";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import EditThoughtForm from "./EditThoughtForm";

export type EditThoughtParams = {
  date: string;
  noteId: string;
  thoughtId: string;
};

const EditThoughtLayout = () => {
  const { dateDisplay, dayOfTheWeek } = useGlobalStore();
  const navigate = useNavigate();
  const { date, noteId, thoughtId } = useParams<EditThoughtParams>();

  const closeForm = () => {
    navigate(-1);
  };

  const parsedNoteId = noteId ? parseInt(noteId, 10) : 0;
  const parsedThoughtId = thoughtId ? parseInt(thoughtId, 10) : 0;
  const formattedDate = date ?? "";

  return (
    <div className="form-container-wrapper">
      <div className="darken-background" />
      <div className="form-container">
        <h1>{dateDisplay}</h1>
        <h1>{dayOfTheWeek}</h1>
        <EditThoughtForm
          noteDate={formattedDate}
          noteId={parsedNoteId}
          thoughtId={parsedThoughtId}
        />
        <img
          className="close-form-btn"
          src="/close-btn.svg"
          alt="Zamknij formularz"
          onClick={closeForm}
        />
      </div>
    </div>
  );
};

export default EditThoughtLayout;