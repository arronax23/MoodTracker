import { useState } from "react";

const AddMedicationForm = () => {
  const [medicationName, setMedicationName] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="medication-name">
          Ocena nastroju
        </label>
        <input
          type="text"
          id="medication-name"
          name="medication-name"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
        ></input>
      </div>

      <button type="submit">Oceń</button>
    </form>
  );
};
export default AddMedicationForm;
