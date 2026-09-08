import { useEffect } from "react";
import { Note } from "../../../types/note";
import { mapColor } from "../../../utilities/colorUtils";

export interface MoodProps {
  note: Note | null,
  moodSection: React.RefObject<HTMLDivElement | null>
}

const Mood = ({ note, moodSection } : MoodProps) => {

  useEffect(() => {
    if (note && note.mood && moodSection.current) {
        moodSection.current.style.background = mapColor(note.mood.color);
      }
  },[note, moodSection])

  return (
    note && (
      <div className="mood-container">
        <div className="mood-rate-header">Ocena nastroju</div>
        <div className="mood-rate-value">
          {note.mood ? note.mood.rate : '-'}
        </div>
      </div>
    )
  );
};
export default Mood;
