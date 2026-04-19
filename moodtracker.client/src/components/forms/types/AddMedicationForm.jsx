import { useState } from "react";
import { apiRequest } from "../../../utilities/useApi";

import { useGlobalStore } from "../../../utilities/useGlobalStore";
import { useNavigate } from "react-router-dom";

const AddMedicationForm = ({ date }) => {
  const [medicationName, setMedicationName] = useState('');
  const [doseValue, setDoseValue] = useState('');
  const [doseUnit, setDoseUnit] = useState('');
  const [time, setTime] = useState('');
  
  const { setUpdatedNoteDate } = useGlobalStore(); 

  const navigate = useNavigate();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const medication = {
      time: time,
      name: medicationName,
      dose: {
        value: doseValue,
        unit: doseUnit
      }
    };

    console.log('type')
    console.log(typeof time)

    const isSuccess = await apiRequest('/api/Notes/AddMedication','PUT',{
      date: date,
      medication: medication
    });
    
    if(isSuccess){
      setUpdatedNoteDate(date);
      navigate(-1);
    }
  }

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
