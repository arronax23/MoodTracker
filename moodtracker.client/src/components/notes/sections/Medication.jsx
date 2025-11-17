import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import { apiRequest } from "../../../utilities/useApi";

const Medication = ({ noteId, noteDate, med, dayName, dateDisplay }) => {
  const navigate = useNavigate();
  const confirmBox = useRef();

  const { setDayOfTheWeek, setDateDisplay, setUpdatedNoteDate } = useGlobalStore();

  const editClick = () => {
    setDayOfTheWeek(dayName);
    setDateDisplay(dateDisplay);
    navigate(`/edit-medication/${noteDate}/${noteId}/${med.id}`);
  };

  const deleteClick = () => {
    confirmBox.current.classList.toggle("active");
  };

  const closeBox = () => {
    confirmBox.current.classList.remove("active");
  };

  const confirmDelete = async () => {
    const isSuccess = await apiRequest('/api/Notes/DeleteMedication','DELETE', {
      noteId: noteId,
      medicationId: med.id
    })

    if (isSuccess){
      confirmBox.current.classList.remove("active");
      setUpdatedNoteDate(noteDate);
    }
  };  

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
        <div className="delete-medication">
          <img
            src="/delete.svg"
            alt="Delete medication"
            className="delete-medication"
            title="Usuń"
            onClick={deleteClick}
          />
          <div ref={confirmBox} className="delete-medication-confirm-box">
            <div className="arrow-down"></div>
            <button onClick={confirmDelete}>Usuń lek</button>
            <img
              src="/close-btn.svg"
              className="close-box"
              alt="Close delete medication box"
              onClick={closeBox}
            />
          </div>
        </div>
      </div>
    )
  );
};
export default Medication;
