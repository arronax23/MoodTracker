const Medication = ({time, name, dosageValue, dosageUnit}) => {
  return (
    <div className="medication-container">
        <div className="time">{time}</div>
        <div className="name">{name}</div>
        <div className="dosage">
            <div className="vale">{dosageValue}</div>
            <div className="unit">{dosageUnit}</div>
        </div>
        <img src="/edit.svg" alt="Edit medication" className="edit-medication" title="Edytuj" />
    </div>
  )
}
export default Medication