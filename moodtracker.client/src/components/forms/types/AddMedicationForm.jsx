import { useState } from "react";

const AddMedicationForm = () => {
  const [medicationName, setMedicationName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [time, setTime] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-medication" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="time">
          Czas
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        ></input>
      </div>

      <div className="form-item">
        <label htmlFor="medication-name">
          Nazwa leku
        </label>
        <input
          type="text"
          id="medication-name"
          name="medication-name"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
        ></input>
      </div>      

      <div className="form-item">
        <label htmlFor="dose-value">
          Dawka
        </label>
        <input
          type="number"
          id="dose-value"
          name="dose-value"
          value={doseValue}
          onChange={(e) => setDoseValue(e.target.value)}
        ></input>
      </div>

      <div className="form-item">
        <label htmlFor="dose-unit">
          Jednostka dawki
        </label>
        <input
          type="text"
          id="dose-unit"
          name="dose-unit"
          value={doseUnit}
          onChange={(e) => setDoseUnit(e.target.value)}
        ></input>
      </div>            

      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddMedicationForm;
