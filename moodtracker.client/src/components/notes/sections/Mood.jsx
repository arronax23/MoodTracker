import { useEffect } from "react";

const Mood = ({ note, moodSection }) => {

  useEffect(() => {
    if (note && note.mood){
      switch (note.mood.color) {
        case 'Red':
           moodSection.current.style.background = '#B23256';
          break;
        case 'Yellow':
           moodSection.current.style.background = '#FCD47D';
          break;
        case 'Green':
           moodSection.current.style.background = '#A2EF44';
          break;                
        default:
          break;
      }
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
