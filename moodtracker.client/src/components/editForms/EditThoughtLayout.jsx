import { useGlobalStore } from "../../utilities/useGlobalStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditThoughtForm from "./EditThoughtForm";

const EditThoughtLayout = () => {
  const { dateDisplay, dayOfTheWeek } = useGlobalStore();
  const navigate = useNavigate();
  const { date, noteId, thoughtId } = useParams();

  const closeForm = () => {
    navigate(-1);
  };

  return (
    <div className="form-container-wrapper">
      <div className="darken-background"></div>
      <div className="form-container">
        <h1>{dateDisplay}</h1>
        <h1>{dayOfTheWeek}</h1>
        <EditThoughtForm noteDate={date} noteId={noteId} thoughtId={thoughtId} />
        <img
          className="close-form-btn"
          src={"/close-btn.svg"}
          onClick={closeForm}
        />
      </div>
    </div>
  );
};
export default EditThoughtLayout;
