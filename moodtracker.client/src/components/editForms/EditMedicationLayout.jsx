import { useEffect } from "react";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditMedicationForm from "./EditMedicationForm";

const EditMedicationLayout = () => {
  const { dateDisplay, dayOfTheWeek } = useGlobalStore();
  const navigate = useNavigate();
  const { noteId, medId } = useParams();

  useEffect(() => {
    console.log(noteId);
    console.log(medId);
  })

  const closeForm = () => {
    navigate(-1);
  };

  return (
    <div className="form-container-wrapper">
      <div className="darken-background"></div>
      <div className="form-container">
        <h1>{dateDisplay}</h1>
        <h1>{dayOfTheWeek}</h1>
        <EditMedicationForm noteId={noteId} medId={medId} />
        <img
          className="close-form-btn"
          src={"/close-btn.svg"}
          onClick={closeForm}
        />
      </div>
    </div>
  );
};
export default EditMedicationLayout;
