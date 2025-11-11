import Calendar from "./components/Calendar";
import FormPanel from "./components/forms/FormPanel";
import DarkenBackground from "./components/DarkenBackground";
import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calendar />}>
        <Route path="/form" element={<FormPanel />} />
        <Route path="/about2" element={<DarkenBackground />} />
      </Route>
    </Routes>
  );
}

export default App;
