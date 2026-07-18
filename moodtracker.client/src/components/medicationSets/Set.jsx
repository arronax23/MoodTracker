import { useRef, useEffect } from "react";
import { apiRequest } from "./../../utilities/useApi"
import { useGlobalStore } from "../../utilities/useGlobalStore";

const Set = ({ id, name, meds }) => {
  const deleteBoxRef = useRef(null);
  const { fetchGet, setFetchGet } = useGlobalStore();

  useEffect(() => {
    console.log(id);
  }, [id]);

  const toggleDeleteBox = () => {
    deleteBoxRef.current.classList.toggle("active");
  };

  const confirmDeleteSet = async () => {
    const isSuccess = await apiRequest('/api/MedicationSet/DeleteSet','DELETE', { setId: id })

    if (isSuccess){
      deleteBoxRef.current.classList.remove("active");
      setFetchGet(prev => !prev);
    }
  };

  return (
    <div className="set-item">
      <div className="delete-set">
        <img
          className="delete-set-btn"
          src={"/delete.svg"}
          onClick={toggleDeleteBox}
        />
        <div ref={deleteBoxRef} className="confirm-delete-box">
          <div className="confirm-delete-btn" onClick={confirmDeleteSet}>
            Usuń zestaw
          </div>
          <img
            className="close-btn"
            src={"/close-btn.svg"}
            onClick={toggleDeleteBox}
          />
          <div className="arrow-down"></div>
        </div>
      </div>
      <div className="header">{name}</div>
      <div className="meds">
        {meds.map((med, index) => (
          <div className="med" key={index}>
            <div className="med-name">{med.name}</div>
            <div className="med-dosage">
              {med.dose.value}
              {med.dose.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Set;
