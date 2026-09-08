import { useNavigate } from "react-router-dom";
import useFetchGet from "../../utilities/useFetchGet";
import { apiRequest } from "../../utilities/useApi";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import { MedicationItem } from "../../types/note";
import { ChangeEvent, SubmitEvent } from "react";

export interface EditMedicationFormProps {
  noteDate: string;
  noteId: number;
  medId: number;
}

const EditMedicationForm = ({ noteDate, noteId, medId }: EditMedicationFormProps) => {
  const { result: med, setResult: setMed } = useFetchGet<MedicationItem>(
    `/api/Notes/GetMedication/${noteId}/${medId}`
  );
  const navigate = useNavigate();
  const { setUpdatedNoteDate } = useGlobalStore();

  const setTime = (newTime: string) => {
    setMed((prev) => (prev ? { ...prev, time: newTime } : prev));
  };

  const setMedicationName = (newName: string) => {
    setMed((prev) => (prev ? { ...prev, name: newName } : prev));
  };

  const setDoseValue = (newDoseValue: string) => {
    const parsedValue = parseFloat(newDoseValue) || 0;
    setMed((prev) =>
      prev
        ? {
            ...prev,
            dose: { value: parsedValue, unit: prev.dose.unit },
          }
        : prev
    );
  };

  const setDoseUnit = (newDoseUnit: string) => {
    setMed((prev) =>
      prev
        ? {
            ...prev,
            dose: { value: prev.dose.value, unit: newDoseUnit },
          }
        : prev
    );
  };

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!med) return;

    const isSuccess = await apiRequest(
      "/api/Notes/EditMedication",
      "PATCH",
      {
        noteId: noteId,
        medication: med,
      }
    );

    if (isSuccess) {
      setUpdatedNoteDate(noteDate);
      navigate(-1);
    }
  };

  if (!med) return null;

  return (
    <form className="edit-medication" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="time">Czas</label>
        <input
          type="time"
          id="time"
          name="time"
          defaultValue={med.time}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="medication-name">Nazwa leku</label>
        <input
          type="text"
          id="medication-name"
          name="medication-name"
          defaultValue={med.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMedicationName(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="dose-value">Dawka</label>
        <input
          type="number"
          id="dose-value"
          name="dose-value"
          lang="en"
          step=".01"
          defaultValue={med.dose.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDoseValue(e.target.value)}
        />
      </div>

      <div className="form-item">
        <label htmlFor="dose-unit">Jednostka dawki</label>
        <input
          type="text"
          id="dose-unit"
          name="dose-unit"
          defaultValue={med.dose.unit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDoseUnit(e.target.value)}
        />
      </div>

      <button type="submit">Edytuj</button>
    </form>
  );
};

export default EditMedicationForm;