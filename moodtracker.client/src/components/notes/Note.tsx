import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../utilities/useGlobalStore";
import { FORM_TYPE } from "../../utilities/formTypes";
import Medication from "./sections/Medication";
import Thought from "./sections/Thought";
import Mood from "./sections/Mood";
import useFetchNote from "../../utilities/useFetchNote";
import useFetchGet from "../../utilities/useFetchGet";

export interface NoteProps {
  date: string;
  dayName: string;
  dateDisplay: string;
  isToday?: boolean;
}

export default function Note({ date, dayName, dateDisplay, isToday = false }: NoteProps) {
  const { setFormType, setDate, setDateDisplay, setDayOfTheWeek } = useGlobalStore();
  const moodSection = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { note } = useFetchNote(date);
  const { result: isWellbutrinDay } = useFetchGet<boolean>(`/api/Wellbutrin/GetWellbutrinDay/${date}`);

  const openForm = () => {
    setDayOfTheWeek(dayName);
    setDate(date);
    setDateDisplay(dateDisplay);
    navigate("/form");
  };

  const rateMood = () => {
    openForm();
    setFormType(FORM_TYPE.mood_rate);
  };

  const addMedication = () => {
    openForm();
    setFormType(FORM_TYPE.add_medication);
  };

  const shareThoughts = () => {
    openForm();
    setFormType(FORM_TYPE.share_thoughts);
  };

  return (
    <div className={isToday ? "note today" : "note"}>
      <div className="date-section">
        <div className="date">{dateDisplay}</div>
        <div className="day-name">{dayName}</div>
        {isWellbutrinDay && (
          <div className="wellbutrin-day" title="Dzień Wellbutrinu">
            <img src="/pill.svg" alt="" />
          </div>
        )}
      </div>

      <div className="section mood" ref={moodSection}>
        <Mood note={note} moodSection={moodSection} />
        <div className="open-form-btn rate-mood-btn" onClick={rateMood}>
          Oceń
        </div>
      </div>

      <div className="section medications">
        <div className="medications-header">Leki</div>
        {note?.medications.map((m) => (
          <Medication
            key={m.id}
            dayName={dayName}
            dateDisplay={dateDisplay}
            noteId={note.id}
            noteDate={date}
            med={m}
          />
        ))}
        <div className="dummy"></div>
        <div
          className="open-form-btn add-medication-btn"
          onClick={addMedication}
        >
          Dodaj lek
        </div>
      </div>

      <div className="section thoughts">
        <div className="thoughts-header">Przemyślenia</div>
        {note?.thoughts?.map((t) => (
          <Thought
            key={t.id}
            dayName={dayName}
            dateDisplay={dateDisplay}
            noteId={note.id}
            noteDate={date}
            thought={t}
          />
        ))}
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