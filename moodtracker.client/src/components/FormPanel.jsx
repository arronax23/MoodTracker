import { useState } from "react";
import { useGlobalStore } from "../utilities/useGlobalStore"

const FormPanel = () => {
    const { formActive, setFormActive, date, dayOfTheWeek } = useGlobalStore(); 
    const [moodRate, setMoodRate ]= useState(1);

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const closeForm = () => {
        setFormActive(false);
    }


    return (
        formActive && <div className="form-container">
                <h1>{date}</h1>
                <h1>{dayOfTheWeek}</h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="mood-rate">Mood rate</label>
                    <input type="number" id="mood-rate" name="mood-rate" min="1" max="10" value={moodRate} onChange={(e) => setMoodRate(e.target.value)}></input>
                    <label htmlFor="title">Medication name</label>
                    {/* <input type="text" name="medication-name" id="medication-name" value={author} onChange={(e) => setAuthor(e.target.value)} /> */}

                    <button type="submit">Zatwierdź</button>
                </form>        
                <img className="close-btn" src={"/close-btn.svg"} onClick={closeForm} />
        </div>
    )
}
export default FormPanel