import { useNavigate } from "react-router";  
import { useParams } from "react-router-dom";
import UpdateSetForm from "./UpdateSetForm";

const UpdateSetLayout = () => {
  const navigate = useNavigate();
  const { setId } = useParams();

  const closeForm = () => {
    navigate(-1);
  };

  return (
    <div className="form-container-wrapper">
      <div className="darken-background"></div>
        <div className="form-container medication-sets-form">
        <h1>Edytuj zestaw</h1>
        <UpdateSetForm setId={setId} />
        <img
          className="close-form-btn"
          src={"/close-btn.svg"}
          onClick={closeForm}
        />
      </div>
    </div>
  )
}
export default UpdateSetLayout