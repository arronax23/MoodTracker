import { Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pl } from "date-fns/locale/pl";

import Calendar from "./components/Calendar";
import FormPanel from "./components/forms/FormPanel";
import EditMedicationLayout from "./components/editForms/EditMedicationLayout";
import EditThoughtLayout from "./components/editForms/EditThoughtLayout";
import Home from "./components/Home";
import MoodChart from "./components/MoodChart";
import HistogramChart from "./components/histogram/HistogramChart";
import MedicationSets from "./components/medicationSets/MedicationSets";
import AddSetLayout from "./components/medicationSets/AddSetLayout";
import UpdateSetLayout from "./components/medicationSets/update/UpdateSetLayout";
import MedCount from "./components/stats/MedCount";
import { JSX } from "react/jsx-runtime";

import "./App.scss";

function App(): JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Calendar />}>
            <Route path="/form" element={<FormPanel />} />
            <Route
              path="/edit-medication/:date/:noteId/:medId"
              element={<EditMedicationLayout />}
            />
            <Route
              path="/edit-thought/:date/:noteId/:thoughtId"
              element={<EditThoughtLayout />}
            />
          </Route>
          <Route path="/chart" element={<MoodChart />} />
          <Route path="/histogram" element={<HistogramChart />} />
          <Route path="/sets" element={<MedicationSets />}>
            <Route path="/sets/add-set" element={<AddSetLayout />} />
            <Route
              path="/sets/update-set/:setId"
              element={<UpdateSetLayout />}
            />
          </Route>
          <Route path="/stats" element={<MedCount />} />
        </Route>
      </Routes>
    </LocalizationProvider>
  );
}

export default App;