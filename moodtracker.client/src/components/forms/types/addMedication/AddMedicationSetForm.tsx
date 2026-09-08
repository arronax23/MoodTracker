import { useState } from "react";
import { FORM_TYPE } from "../../../../utilities/formTypes";
import { useGlobalStore } from "../../../../utilities/useGlobalStore";
import useFetchGet from "../../../../utilities/useFetchGet";
import { apiRequest } from "../../../../utilities/useApi";
import { useNavigate } from "react-router-dom";
import { getLocalTime } from "../../../../utilities/dateUtils"

export interface MedicationSet {
  id: string;
  name: string;
  meds: {
    name: string;
    dose: {
      value: number;
      unit: string;
    };
  }[];
}

const AddMedicationSetForm = ({ date } : { date: string }) => {
  const { setUpdatedNoteDate, setFormType } = useGlobalStore();  
  const navigate = useNavigate();
  const [time, setTime] = useState(getLocalTime());
  const { result: medicationSets } = useFetchGet<MedicationSet[]>("/api/MedicationSet/GetSets");

  const goBack = () => {
    setFormType(FORM_TYPE.add_medication);
  };

  const open = (e : React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.closest(".set")!.classList.toggle("open");
  };

  const pickSet = async (e : React.MouseEvent<HTMLImageElement>) => {
    const id = e.currentTarget.closest(".set")!.getAttribute('id');

    const isSuccess = await apiRequest('/api/Notes/AddMedicationsFromSet','PUT',{
      noteDate: date,
      medicationSetId: id,
      time: time
    });
    
    if (isSuccess) {
      setUpdatedNoteDate(date)
      navigate(-1);
    } 
  };  

  return (
    <div className="add-medication-set">
      <img className="back-btn" src={"/back.svg"} onClick={goBack} />
      <div className="time-picker">
        <label htmlFor="time">
          Czas
        </label>
        <input
          type="time"
          id="time"
          name="time"
          defaultValue={time}
          onChange={(e) => setTime(e.target.value)}
        ></input>        
      </div>
      <h1 className="header">Wybierz zestaw leków</h1>
      <div className="sets">
        {medicationSets &&
          medicationSets.map((set) => (
            <div key={set.id} id={set.id} className="set">
              <h3 onClick={open} className="set-header">
                {set.name}
              </h3>
              <div className="set-body">
                <div className="meds">
                  {set.meds.map((med, index) => (
                    <div className="med" key={index}>
                      <div className="med-name">{med.name}</div>
                      <div className="med-dosage">
                        {med.dose.value}
                        {med.dose.unit}
                      </div>
                    </div>
                  ))}
                  <div className="pick">
                    <img
                      className="pick-btn"
                      src={"/pick.svg"}  
                      onClick={pickSet}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AddMedicationSetForm;
