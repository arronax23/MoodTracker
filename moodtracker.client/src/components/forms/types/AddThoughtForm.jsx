import { useState } from "react";

const AddThoughtForm = () => {
  const [thought, setThought] = useState('');
  const [time, setTime] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="add-thought" onSubmit={onSubmit}>
      <div className="form-item">
        <label htmlFor="time">
          Czas
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        ></input>
      </div>

      <div className="form-item">
        <label htmlFor="thought">
          Myśl
        </label>
        <input
          type="text"
          id="thought"
          name="thought"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        ></input>
      </div>      
         

      <button type="submit">Dodaj</button>
    </form>
  );
};
export default AddThoughtForm;
