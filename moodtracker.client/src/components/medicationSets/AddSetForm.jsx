import { useState } from "react";
import MedicationFormItem from "./MedicationFormItem";

const AddSetForm = () => {
  const [medicationCount, setmedicationCount] = useState(1)
  const [medicationSet, setmedicationSet] = useState([])


  
  const onSubmit = async (e) => {
    e.preventDefault();
  
  }

  const plusClick = () => {
    setmedicationCount(prev => prev + 1);
  }

  return (
    <form className="add-set" onSubmit={onSubmit}>
      {[...Array(medicationCount)].map((_, i) => (
        <MedicationFormItem medicationSet={medicationSet} setmedicationSet={setmedicationSet} key={i} />
      ))}
      <div className="form-item">
        <img
          className="plus-btn"
          src={"/plus.svg"}
          onClick={plusClick}
        />          
        </div>  
    
      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddSetForm;
