import { useGlobalStore } from "../../utilities/useGlobalStore"
import { FORM_TYPE } from "../../utilities/formTypes";
import Medication from "./sections/Medication";
import Thought from "./sections/Thought";
import Mood from "./sections/Mood";

export default function Note({ dayName, date }) {
  const { setFormActive, setFormType, setDate, setDayOfTheWeek } = useGlobalStore(); 

  const rateMood = () => {
    openForm();
    setFormType(FORM_TYPE.mood_rate)
  }

  const addMediction = () => {
    openForm();
    setFormType(FORM_TYPE.add_medication);
  }

  const shareThoughts = () => {
    openForm();
    setFormType(FORM_TYPE.share_thoughts)
  }

  const openForm = () => {
    setFormActive(true);
    setDayOfTheWeek(date);
    setDate(dayName);
  }

  return (
    <div className='note'>
        <div className="date">{date}</div>
        <div className="day-name">{dayName}</div>
        <div className="section mood">
          <Mood value={7} />
          <div className="open-form-btn rate-mood-btn" onClick={rateMood}>Oceń</div>
        </div>
      <div className="section medications">
        <div className="medications-header">Leki</div>
        <Medication time='14:40' name="Anafranil" dosageValue="75" dosageUnit="mg" />
        <Medication time='16:55' name="Wellbutrin" dosageValue="150" dosageUnit="mg" />
        <Medication time='19:20' name="Medikinet IR" dosageValue="10" dosageUnit="mg" />
        <Medication time='19:20' name="Medikinet IR" dosageValue="10" dosageUnit="mg" />
        <div className="dummy"></div>
        <div className="open-form-btn add-medication-btn" onClick={addMediction}>Dodaj lek</div>
      </div>
      <div className="section thoughts">
          <div className="thoughts-header">Przemyślenia</div>
          <Thought time="10:33" value="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique s" />
          <Thought time="15:12" value="On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of " />
          <div className="dummy"></div>
        <div className="open-form-btn share-thoughts-btn" onClick={shareThoughts}>Dodaj przemyślenia</div>
      </div>
    </div>
  )
}