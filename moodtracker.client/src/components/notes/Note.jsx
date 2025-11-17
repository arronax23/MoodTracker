import { useGlobalStore } from "../../utilities/useGlobalStore";
import { FORM_TYPE } from "../../utilities/formTypes";
import Medication from "./sections/Medication";
import Thought from "./sections/Thought";
import Mood from "./sections/Mood";
import useFetchNote from "../../utilities/useFetchNote";
import { useNavigate } from "react-router-dom";

export default function Note({ date, dayName, dateDisplay }) {
  const {
    setFormType,
    setDate,
    setDateDisplay,
    setDayOfTheWeek,
  } = useGlobalStore();

  const navigate = useNavigate();

  const { note } = useFetchNote(date);

  const rateMood = () => {
    openForm();
    setFormType(FORM_TYPE.mood_rate);
  };

  const addMediction = () => {
    openForm();
    setFormType(FORM_TYPE.add_medication);
  };

  const shareThoughts = () => {
    openForm();
    setFormType(FORM_TYPE.share_thoughts);
  };

  const openForm = () => {
    setDayOfTheWeek(dayName);
    setDate(date);
    setDateDisplay(dateDisplay);
    navigate('/form')

  };

  return (
    <div className="note">
      <div className="date-section">
      <div className="date">{dateDisplay}</div>
      <div className="day-name">{dayName}</div>        
      </div>
   
      <div className="section mood">
        <Mood note={note} />
        <div className="open-form-btn rate-mood-btn" onClick={rateMood}>
          Oceń
        </div>
      </div>
      <div className="section medications">
        <div className="medications-header">Leki</div>
        {note &&
          note.medications &&
          note.medications.map((m) => <Medication dayName={dayName} dateDisplay={dateDisplay} noteId={note.id} noteDate={date} med={m} />)}
        <div className="dummy"></div>
        <div
          className="open-form-btn add-medication-btn"
          onClick={addMediction}
        >
          Dodaj lek
        </div>
      </div>
      <div className="section thoughts">
        <div className="thoughts-header">Przemyślenia</div>
        {note &&
          note.thoughts &&
          note.thoughts.map((t) => <Thought dayName={dayName} dateDisplay={dateDisplay} noteId={note.id} noteDate={date} thought={t} />)}
        <div className="dummy"></div>
        <div
          className="open-form-btn share-thoughts-btn"
          onClick={shareThoughts}
        >
          Dodaj przemyślenia
        </div>
      </div>
    </div>
  );
}
