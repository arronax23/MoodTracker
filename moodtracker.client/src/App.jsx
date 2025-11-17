import Calendar from "./components/Calendar";
import FormPanel from "./components/forms/FormPanel";
import EditMedicationLayout from "./components/editForms/EditMedicationLayout";
import EditThoughtLayout from "./components/editForms/EditThoughtLayout";
import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calendar />}>
        <Route path="/form" element={<FormPanel />} />
        <Route path="/edit-medication/:date/:noteId/:medId" element={<EditMedicationLayout />} />
        <Route path="/edit-thought/:date/:noteId/:thoughtId" element={<EditThoughtLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
