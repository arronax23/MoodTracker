import { useGlobalStore } from "../../utilities/useGlobalStore"
import { FORM_TYPE } from "../../utilities/formTypes";
import MoodRateForm from "./types/MoodRateForm";
import AddMedicationForm from "./types/AddMedicationForm";
import AddThoughtForm from "./types/AddThoughtForm";

const FormPanel = () => {
    const { formActive, setFormActive, formType, date, dayOfTheWeek } = useGlobalStore(); 

    const closeForm = () => {
        setFormActive(false);
    }

    return (
        formActive && <div className="form-container">
                <h1>{date}</h1>
                <h1>{dayOfTheWeek}</h1>
                {formType === FORM_TYPE.mood_rate && <MoodRateForm />}
                {formType === FORM_TYPE.add_medication && <AddMedicationForm />}
                {formType === FORM_TYPE.share_thoughts && <AddThoughtForm />}
                <img className="close-form-btn" src={"/close-btn.svg"} onClick={closeForm} />
        </div>
    )
}
export default FormPanel