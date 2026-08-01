import { apiRequest } from "../../../utilities/useApi";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../utilities/useGlobalStore";
import useFetchGet from "../../../utilities/useFetchGet";


const emptyMedication = {
  name: "",
  dose: {
    value: "",
    unit: "",
  },
};


const UpdateSetForm = ({ setId }) => {
  const { result: set, setResult: setSet } = useFetchGet(`/api/MedicationSet/GetSet/${setId}`);

  const { setFetchGet } = useGlobalStore();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(set);

    const isSuccess = await apiRequest(
      "/api/MedicationSet/UpdateSet",
      "PATCH",
      {
        set: set,
      },
    );

    if (isSuccess) {
      navigate(-1);
      setFetchGet((prev) => !prev);
    }
  };

  const handleNameChange = (newName) => {
    setSet((prev) => ({
      ...prev,
      name: newName,
    }));

    console.log(set);
  };

  const handleChange = (index, field, value) => {
    const newMeds = [...set.meds];
    newMeds[index] = {
      ...newMeds[index],
      [field]: value,
    };

    setSet((prev) => ({
      ...prev,
      meds: newMeds,
    }));

    console.log(set);
  };

  const handleDoseChange = (index, field, value) => {
    const newMeds = [...set.meds];
    newMeds[index] = {
      ...newMeds[index],
      dose: {
        ...newMeds[index].dose,
        [field]: value,
      },
    };

    setSet((prev) => ({
      ...prev,
      meds: newMeds,
    }));
  };

  const removeMedication = (index) => {
    const updated = set.meds.filter((_, i) => i !== index);
    setSet((prev) => ({
      ...prev,
      meds: updated,
    }));
  };

  const plusClick = () => {
    setSet((prev) => ({
      ...prev,
      meds: [...prev.meds, emptyMedication],
    }));
  };

  return (
    <form className="add-set" onSubmit={onSubmit}>
      {set && (
        <div className="form-item set-name">
          <label htmlFor="set-name">Nazwa zestawu</label>
          <input
            type="text"
            id="set-name"
            name="set-name"
            value={set.name}
            onChange={(e) => handleNameChange(e.target.value)}
          ></input>
        </div>
      )}
      {set &&
        set.meds.map((med, index) => (
          <div className="add-set-item" key={index}>
            <div className="med-header">
              <div className="empty"></div>
              <div className="med-index">{index + 1}</div>
              <div className="remove-medication">
                <img
                  src="/delete.svg"
                  alt="Delete medication"
                  className="delete-medication"
                  title="Usuń lek"
                  onClick={() => removeMedication(index)}
                />
              </div>
            </div>

            <div className="form-item">
              <label htmlFor="medication-name">Nazwa leku</label>
              <input
                type="text"
                id="medication-name"
                name="medication-name"
                value={med.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              ></input>
            </div>

            <div className="form-item">
              <label htmlFor="dose-value">Dawka</label>
              <input
                type="number"
                id="dose-value"
                name="dose-value"
                value={med.dose.value}
                onChange={(e) =>
                  handleDoseChange(index, "value", e.target.value)
                }
              ></input>
            </div>

            <div className="form-item">
              <label htmlFor="dose-unit">Jednostka dawki</label>
              <input
                type="text"
                id="dose-unit"
                name="dose-unit"
                value={med.dose.unit}
                onChange={(e) =>
                  handleDoseChange(index, "unit", e.target.value)
                }
              ></input>
            </div>
            <br />
          </div>
        ))}

      <div className="form-item">
        <img
          className="plus-btn"
          src={"/plus.svg"}
          onClick={plusClick}
          title="Dodaj lek"
        />
      </div>

      <button className="add-set-btn" type="submit">
        Edytuj zestaw
      </button>
    </form>
  );
};
export default UpdateSetForm;
