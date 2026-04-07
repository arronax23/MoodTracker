import { useNavigate } from "react-router";  
import AddSetForm from "./AddSetForm";

const AddSetLayout = () => {
  const navigate = useNavigate();

  const closeForm = () => {
    navigate(-1);
  };

  return (
    <div className="form-container-wrapper">
      <div className="darken-background">AddSet</div>
        <div className="form-container">
        <h1>Dodaj zestaw</h1>
        <AddSetForm />
        <img
          className="close-form-btn"
          src={"/close-btn.svg"}
          onClick={closeForm}
        />
      </div>
    </div>
  )
}
export default AddSetLayout