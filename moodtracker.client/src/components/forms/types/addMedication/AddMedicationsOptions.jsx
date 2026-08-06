import { useGlobalStore } from "../../../../utilities/useGlobalStore";
import { FORM_TYPE } from "../../../../utilities/formTypes";


const AddMedicationsOptions = () => {
    const { setFormType } = useGlobalStore(); 

  const handleSubmit = (e) => {
    console.log(e.target.addOption.value);  

    switch (e.target.addOption.value) {
      case "single":
        setFormType(FORM_TYPE.add_medication_single);
        break;
      case "set":
        setFormType(FORM_TYPE.add_medication_set);
        break;
    }
  };

  return (
    <div className="add-medication-options">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dodaj leki</legend>

          <div className="options">
            <div>
              <input type="radio" id="single" name="addOption" value="single" defaultChecked />
              <label htmlFor="single">Pojedynczo</label>
            </div>

            <div>
              <input type="radio" id="set" name="addOption" value="set" />
              <label htmlFor="set">Z zestawu</label>
            </div>
          </div>

          <div className="submit-btn">
            <button type="submit">Zatwierdź</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default AddMedicationsOptions;
