import { useState } from "react";

const MedicationFormItem = ({ medicationSet, setMedicationSet }) => {
  const [medication, setMedication] = useState({
    name: '',
    doseValue: 0,
    doseUnit: ''
  });


  const setMedicationName = (e) => {
    setMedication(prev => ({...prev, name: e.target.value}))

    setMedicationSet(prev => ([...prev, medication]))

    console.log(medicationSet)
  }


   const setDoseValue = (e) => {
    setMedication(prev => ({...prev, name: e.target.value}))

    setMedicationSet(prev => ([...prev, medication]))

    console.log(medicationSet)
  } 

  
   const setDoseUnit = (e) => {
    setMedication(prev => ({...prev, name: e.target.value}))

    setMedicationSet(prev => ([...prev, medication]))

    console.log(medicationSet)
  } 


  return (
    <div>
  <div className="form-item">
        <label htmlFor="medication-name">
          Nazwa leku
        </label>
        <input
          type="text"
          id="medication-name"
          name="medication-name"
          value={medication.name}
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
          value={medication.doseValue}
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
          value={medication.doseUnit}
          onChange={(e) => setDoseUnit(e.target.value)}
        ></input>       
    </div>
    </div>
  )
}
export default MedicationFormItem