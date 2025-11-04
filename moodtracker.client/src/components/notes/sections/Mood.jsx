import { handleMoodRateDisplay } from "../../../utilities/formatter";

const Mood = ({ note }) => {
  return (
    note && (
      <div className="mood-container">
        <div className="mood-rate-header">Ocena nastroju</div>
        <div className="mood-rate-value">
          {handleMoodRateDisplay(note.moodRate)}
        </div>
      </div>
    )
  );
};
export default Mood;
