import { useGlobalStore } from "../../../../utilities/useGlobalStore";
import { FORM_TYPE } from "../../../../utilities/formTypes";

const AddMedicationsOptions = () => {
  const { setFormType } = useGlobalStore();

  const handleAction = (formData: FormData) => {
    const selectedOption = formData.get("addOption") as string | null;

    switch (selectedOption) {
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
      <form action={handleAction}>
        <fieldset>
          <legend>Dodaj leki</legend>

          <div className="options">
            <div className="option">
              <input 
                type="radio" 
                id="single" 
                name="addOption" 
                value="single" 
                defaultChecked 
              />
              <label htmlFor="single">Pojedynczo</label>
            </div>

            <div className="option">
              <input 
                type="radio" 
                id="set" 
                name="addOption" 
                value="set" 
              />
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