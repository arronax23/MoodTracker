import { apiRequest } from "../../../../utilities/useApi";
import { getLocalTime } from "../../../../utilities/dateUtils";
import { useGlobalStore } from "../../../../utilities/useGlobalStore";
import { useNavigate } from "react-router-dom";
import { FORM_TYPE } from "../../../../utilities/formTypes";

export interface Medication {
  time: string;
  name: string;
  dose: {
    value: string;
    unit: string;
  };
}

const AddMedicationForm = ({ date }: { date: string }) => {
  const { setUpdatedNoteDate, setFormType } = useGlobalStore();

  const navigate = useNavigate();

  const goBack = () => {
    setFormType(FORM_TYPE.add_medication);
  };

  const submit = async (formData: FormData) => {
    const time = formData.get("time") as string;
    const medicationName = formData.get("medication-name") as string;
    const doseValue = formData.get("dose-value") as string;
    const doseUnit = formData.get("dose-unit") as string;

    const medication : Medication = {
      time: time,
      name: medicationName,
      dose: {
        value: doseValue,
        unit: doseUnit,
      },
    };

    const isSuccess = await apiRequest("/api/Notes/AddMedication", "PUT", {
      date: date,
      medication: medication,
    });

    if (isSuccess) {
      setUpdatedNoteDate(date);
      navigate(-1);
    }
  };

  return (
    <form className="add-medication" action={submit}>
      <img className="back-btn" src={"/back.svg"} onClick={goBack} />
      <div className="form-item">
        <label htmlFor="time">Czas</label>
        <input
          type="time"
          id="time"
          name="time"
          defaultValue={getLocalTime()}
        ></input>
      </div>

      <div className="form-item">
        <label htmlFor="medication-name">Nazwa leku</label>
        <input type="text" id="medication-name" name="medication-name"></input>
      </div>

      <div className="form-item">
        <label htmlFor="dose-value">Dawka</label>
        <input type="number" id="dose-value" name="dose-value"></input>
      </div>

      <div className="form-item">
        <label htmlFor="dose-unit">Jednostka dawki</label>
        <input type="text" id="dose-unit" name="dose-unit"></input>
      </div>

      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddMedicationForm;
