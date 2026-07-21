import { useState } from "react";
import { apiRequest } from "../../utilities/useApi";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import MedicationFormItem from "./MedicationFormItem";

const emptyMedication = {
  name: "",
  dose: {
    value: "",
    unit: "",
  },
};

const AddSetForm = () => {
  const [meds, setMeds] = useState([emptyMedication]);
  const [setName, setSetName] = useState("");
  const { fetchGet, setFetchGet } = useGlobalStore();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await apiRequest("/api/MedicationSet/AddSet", "POST", {
      name: setName,
      meds: meds,
    });

    if (isSuccess) {
      navigate(-1);
      setFetchGet((prev) => !prev);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...meds];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMeds(updated);
    console.log(updated);
  };

  const handleDoseChange = (index, field, value) => {
    const updated = [...meds];
    updated[index] = {
      ...updated[index],
      dose: {
        ...updated[index].dose,
        [field]: value,
      },
    };
    setMeds(updated);
    console.log(updated);
  };

  const removeMedication = (index) => {
    const updated = meds.filter((_, i) => i !== index);
    setMeds(updated);
  };

  const plusClick = () => {
    setMeds([...meds, emptyMedication]);
  };

  return (
    <form className="add-set" onSubmit={onSubmit}>
      <div className="form-item set-name">
        <label htmlFor="set-name">Nazwa zestawu</label>
        <input
          type="text"
          id="set-name"
          name="set-name"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
        ></input>
      </div>
      {meds.map((med, index) => (
        <div className="add-set-item" key={index}>
          <div className="med-header">
            <div className="empty"></div>
            <div className="med-index">{index + 1}</div>
            <div className="remove-medication">
              <img
                src="/delete.svg"
                alt="Delete medication"
                className="delete-medication"
                title="Usuń lek"
                onClick={() => removeMedication(index)}
              />
            </div>
          </div>

          <div className="form-item">
            <label htmlFor="medication-name">Nazwa leku</label>
            <input
              type="text"
              id="medication-name"
              name="medication-name"
              value={med.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            ></input>
          </div>

          <div className="form-item">
            <label htmlFor="dose-value">Dawka</label>
            <input
              type="number"
              id="dose-value"
              name="dose-value"
              value={med.dose.value}
              onChange={(e) => handleDoseChange(index, "value", e.target.value)}
            ></input>
          </div>

          <div className="form-item">
            <label htmlFor="dose-unit">Jednostka dawki</label>
            <input
              type="text"
              id="dose-unit"
              name="dose-unit"
              value={med.dose.unit}
              onChange={(e) => handleDoseChange(index, "unit", e.target.value)}
            ></input>
          </div>
          <br />
        </div>
      ))}

      <div className="form-item">
        <img
          className="plus-btn"
          src={"/plus.svg"}
          onClick={plusClick}
          title="Dodaj lek"
        />
      </div>

      <button className="add-set-btn" type="submit">
        Dodaj zestaw
      </button>
    </form>
  );
};
export default AddSetForm;
