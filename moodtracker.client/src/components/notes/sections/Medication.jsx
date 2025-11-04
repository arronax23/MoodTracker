import { useEffect } from "react";

const Medication = ({ med }) => {
  useEffect(() => {console.log(typeof med.time)},[med])
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
        />
      </div>
    )
  );
};
export default Medication;
