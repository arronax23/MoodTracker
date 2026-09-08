import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import { apiRequest } from "../../../utilities/useApi";
import { ThoughtItem } from "../../../types/note";

export interface ThoughtProps {
  thought: ThoughtItem;
  noteId: number;
  noteDate: string;
  dayName: string;
  dateDisplay: string;
}

const Thought = ({ thought, noteId, noteDate, dayName, dateDisplay }: ThoughtProps) => {
  const navigate = useNavigate();
  const confirmBox = useRef<HTMLDivElement>(null);

  const { setDayOfTheWeek, setDateDisplay, setUpdatedNoteDate } = useGlobalStore();

  const editClick = () => {
    setDayOfTheWeek(dayName);
    setDateDisplay(dateDisplay);
    navigate(`/edit-thought/${noteDate}/${noteId}/${thought.id}`);
  };

  const deleteClick = () => {
    confirmBox.current?.classList.toggle("active");
  };

  const closeBox = () => {
    confirmBox.current?.classList.remove("active");
  };

  const confirmDelete = async () => {
    const isSuccess = await apiRequest(
      "/api/Notes/DeleteThought",
      "DELETE",
      {
        noteId: noteId,
        thoughtId: thought.id,
      }
    );

    if (isSuccess) {
      confirmBox.current?.classList.remove("active");
      setUpdatedNoteDate(noteDate);
    }
  };

  if (!thought) return null;

  return (
    <div className="thought-container">
      <div className="time">{thought.time}</div>
      <div className="line"></div>
      <div className="text">{thought.text}</div>
      <div className="edit-delete">
        <img
          src="/edit.svg"
          alt="Edit thought"
          className="edit-thought"
          title="Edytuj"
          onClick={editClick}
        />
        <div className="delete-thought">
          <img
            src="/delete.svg"
            alt="Delete thought"
            className="delete-thought"
            title="Usuń"
            onClick={deleteClick}
          />
          <div ref={confirmBox} className="delete-thought-confirm-box">
            <div className="arrow-down"></div>
            <button onClick={confirmDelete}>Usuń myśl</button>
            <img
              src="/close-btn.svg"
              className="close-box"
              alt="Close delete thought box"
              onClick={closeBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thought;