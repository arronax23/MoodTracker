import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";

const MedicationSets = () => {
  const navigate = useNavigate();

  const addSetClick = () => {
    navigate('/sets/add-set');
  }

  return (
    <div className="medication-sets-container">
      <Outlet />
      <div>MedicationSets</div>
      <button onClick={addSetClick}>Dodaj zestaw</button>
    </div>
  )
}
export default MedicationSets