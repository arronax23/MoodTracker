import { useNavigate } from "react-router-dom";
import useFetchGet from "../../utilities/useFetchGet";
import { apiRequest } from "../../utilities/useApi";
import { useGlobalStore } from "../../utilities/useGlobalStore";

const EditMedicationForm = ({noteDate, noteId, medId }) => {
  const { result: med, setResult: setMed } = useFetchGet(`/api/Notes/GetMedication/${noteId}/${medId}`);
  const navigate = useNavigate();
  const { setUpdatedNoteDate } = useGlobalStore();
  
  const setTime = async (newTime) => {
    setMed(prev => ({...prev, time: newTime}))
  }

  const setMedicationName = async (newName) => {
    setMed(prev => ({...prev, name: newName}))
  }

    const setDoseValue = async (newDoseValue) => {
    setMed(prev => ({...prev, dose: {value: newDoseValue, unit: prev.dose.unit}}))
  }

    const setDoseUnit = async (newDoseUnit) => {
    setMed(prev => ({...prev, dose: {value: prev.dose.value, unit: newDoseUnit}}))
  }



  const onSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await apiRequest('/api/Notes/EditMedication','PATCH',{
      noteId: noteId,
      medication: med
    });
    
    if(isSuccess) {
      console.log(isSuccess)
      console.log("SUCCESS Editing med")
      console.log(noteDate)
      setUpdatedNoteDate(noteDate);
      navigate(-1);
    }
  }

  return (
    med && (
    <form className="edit-medication" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="time">
          Czas
        </label>
        <input
          type="time"
          id="time"
          name="time"
          defaultValue={med.time}
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
          defaultValue={med.name}
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
          defaultValue={med.dose.value}
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
          defaultValue={med.dose.unit}
          onChange={(e) => setDoseUnit(e.target.value)}
        ></input>
      </div>            

      <button type="submit">Edytuj</button>
    </form>
  ));
};
export default EditMedicationForm;
