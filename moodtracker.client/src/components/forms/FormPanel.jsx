import { useGlobalStore } from "../../utilities/useGlobalStore"
import { FORM_TYPE } from "../../utilities/formTypes";
import MoodRateForm from "./types/MoodRateForm";
import AddMedicationsOptions from "./types/addMedication/AddMedicationsOptions";
import AddMedicationForm from "./types/addMedication/AddMedicationForm";
import AddMedicationSetForm from "./types/addMedication/AddMedicationSetForm";
import AddThoughtForm from "./types/AddThoughtForm";
import { useNavigate } from "react-router-dom";

const FormPanel = () => {
    const { formType, dateDisplay, date, dayOfTheWeek } = useGlobalStore(); 
    const navigate = useNavigate();

    const closeForm = () => {
        navigate(-1);
    }

    return (
        <div className="form-container-wrapper">
            <div className="darken-background"></div>
            <div className="form-container">
                    <h1>{dateDisplay}</h1>
                    <h1>{dayOfTheWeek}</h1>
                    {formType === FORM_TYPE.mood_rate && <MoodRateForm date={date} />}
                    {formType === FORM_TYPE.add_medication && <AddMedicationsOptions />}
                    {formType === FORM_TYPE.add_medication_single && <AddMedicationForm date={date} />}
                    {formType === FORM_TYPE.add_medication_set && <AddMedicationSetForm date={date} />}
                    {formType === FORM_TYPE.share_thoughts && <AddThoughtForm date={date} />}
                    <img className="close-form-btn" src={"/close-btn.svg"} onClick={closeForm} />
            </div>
        </div>
    )
}
export default FormPanel