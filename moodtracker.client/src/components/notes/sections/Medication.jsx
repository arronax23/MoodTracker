import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../utilities/useGlobalStore";

const Medication = ({ noteId, med, dayName, dateDisplay }) => {
  const navigate = useNavigate();

  const { setDayOfTheWeek, setDateDisplay} = useGlobalStore();

  const editClick = () =>{
    setDayOfTheWeek(dayName);
    setDateDisplay(dateDisplay);
    navigate(`/edit-medication/${noteId}/${med.id}`);
  }

  return (
    med && (
      <div className="medication-container">
        <div className="time">{med.time}</div>
        <div className="name">{med.name}</div>
        <div className="dosage">
          <div className="vale">{med.dose.value}</div>
          <div className="unit">{med.dose.unit}</div>
        </div>
        <img
          src="/edit.svg"
          alt="Edit medication"
          className="edit-medication"
          title="Edytuj"
          onClick={editClick}
        />
      </div>
    )
  );
};
export default Medication;
