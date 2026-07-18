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
  const [medicationSet, setMedicationSet] = useState([emptyMedication]);
  const { fetchGet, setFetchGet } = useGlobalStore();  
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await apiRequest("/api/MedicationSet/AddSet", "POST", {
      name: "Dummy",
      meds: medicationSet,
    });

    if (isSuccess) {
      navigate(-1);
      setFetchGet(prev => !prev);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...medicationSet];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMedicationSet(updated);
    console.log(updated);
  };

  const handleDoseChange = (index, field, value) => {
    const updated = [...medicationSet];
    updated[index] = {
      ...updated[index],
      dose: {
        ...updated[index].dose,
        [field]: value,
      },
    };
    setMedicationSet(updated);
    console.log(updated);
  };

  const removeMedication = (index) => {
    const updated = medicationSet.filter((_, i) => i !== index);
    setMedicationSet(updated);
  };

  const plusClick = () => {
    setMedicationSet([...medicationSet, emptyMedication]);
  };

  return (
    <form className="add-set" onSubmit={onSubmit}>
      {medicationSet.map((med, index) => (
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
