import { useNavigate, useParams } from "react-router-dom";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import EditMedicationForm from "./EditMedicationForm";

export type EditMedicationParams = {
  date: string;
  noteId: string;
  medId: string;
};

const EditMedicationLayout = () => {
  const { dateDisplay, dayOfTheWeek } = useGlobalStore();
  const navigate = useNavigate();
  const { date, noteId, medId } = useParams<EditMedicationParams>();

  const closeForm = () => {
    navigate(-1);
  };

  const parsedNoteId = noteId ? parseInt(noteId, 10) : 0;
  const parsedMedId = medId ? parseInt(medId, 10) : 0;
  const formattedDate = date ?? "";

  return (
    <div className="form-container-wrapper">
      <div className="darken-background" />
      <div className="form-container">
        <h1>{dateDisplay}</h1>
        <h1>{dayOfTheWeek}</h1>
        <EditMedicationForm
          noteDate={formattedDate}
          noteId={parsedNoteId}
          medId={parsedMedId}
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

export default EditMedicationLayout;