import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

import { format } from 'date-fns';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import useFetchGet from "../../utilities/useFetchGet";


const MedCount = () => {
  const [startDate, setStartDate] = useState(new Date("2026-01-01"));
  const [endDate, setEndDate] = useState(new Date("2026-08-22"));
  const [dateRangeParams, setDateRangeParams] = useState(`${format(startDate,'yyyy-MM-dd')}/${format(endDate,'yyyy-MM-dd')}`);
  const { result } = useFetchGet(
    `/api/Stats/GetMedCountForTimePeriod/${dateRangeParams}`,
  );

  useEffect(() => {
    console.log(result);
  }, [result]);

  
  const submitDateRange = () => {
    setDateRangeParams(`${format(startDate,'yyyy-MM-dd')}/${format(endDate,'yyyy-MM-dd')}`)
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "medicationName",
        header: "Nazwa leku",
      },
      {
        accessorKey: "count",
        header: "Ilość",
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: result ? result : [],
    enableExpanding: true,
    enableStickyHeader: true,
    initialState: { pagination: { pageSize: 100 } },
    getSubRows: (row) => row.medicationWithDose,
    muiTableContainerProps: {
      sx: {
        height: "500px",
      },
    },
    renderTopToolbarCustomActions: () => (
      <div className="table-header">Bilans leków</div>
    ),
  });

  return (
    <div className="meds-count-container">
      {result && (
        <div className="meds-count-content">
          <div className="date-pickers">
            <h3>Zakres czasu</h3>
            <DatePicker value={startDate} onChange={(newDate) => setStartDate(newDate)} label="Od" />
            <DatePicker className="end-date-picker" value={endDate} onChange={(newDate) => setEndDate(newDate)} label="Do" />
              <button className="submit-date-range" onClick={submitDateRange}>Zatwierdź</button>
          </div>
          <MaterialReactTable table={table} />
        </div>
      )}
    </div>
  );
};
export default MedCount;
