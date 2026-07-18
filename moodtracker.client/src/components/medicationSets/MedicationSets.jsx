import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import List from "./List";

const MedicationSets = () => {
  const navigate = useNavigate();

  const addSetClick = () => {
    navigate('/sets/add-set');
  }

  return (
    <div className="medication-sets-container">
      <Outlet />
      <h1 className="header">Zestawy leków</h1>
      <List />
      <button onClick={addSetClick}>Dodaj zestaw</button>
    </div>
  )
}
export default MedicationSets