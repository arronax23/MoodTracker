import Loader from "../Loader";
import { useEffect, useMemo, useState, useRef } from "react";
import { DatePicker } from "@mui/x-date-pickers";

import { format, addMonths, addWeeks } from 'date-fns';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import useFetchGet from "../../utilities/useFetchGet";


const MedCount = () => {
  const lastMonthBtn = useRef();
  const lastWeekBtn = useRef();
  const submitBtn = useRef();
  const [startDate, setStartDate] = useState(addMonths(new Date(),-1));
  const [endDate, setEndDate] = useState(new Date());
  const [dateRangeParams, setDateRangeParams] = useState(`${format(startDate,'yyyy-MM-dd')}/${format(endDate,'yyyy-MM-dd')}`);
  
  const { result, isPending } = useFetchGet(
    `/api/Stats/GetMedCountForTimePeriod/${dateRangeParams}`,
  );

  
  const pickParamsFromDates = (start, end) => {
    setDateRangeParams(`${format(start,'yyyy-MM-dd')}/${format(end,'yyyy-MM-dd')}`)
  }

  const submitDateRange = () => {
    pickParamsFromDates(startDate, endDate);

    submitBtn.current.classList.add('active');    
    lastWeekBtn.current.classList.remove('active');    
    lastMonthBtn.current.classList.remove('active');    
  }

  const setLastMonth = () => {
    const today = new Date();
    const monthBefore = addMonths(new Date(),-1)

    setStartDate(monthBefore)
    setEndDate(today);

    pickParamsFromDates(monthBefore, today);

    lastMonthBtn.current.classList.add('active');    
    lastWeekBtn.current.classList.remove('active');   
    submitBtn.current.classList.remove('active');     
  }

  const setLastWeek = () => {
    const today = new Date();
    const weekBefore = addWeeks(new Date(),-1)

    setStartDate(weekBefore)
    setEndDate(today);

    pickParamsFromDates(weekBefore, today);

    lastWeekBtn.current.classList.add('active');    
    lastMonthBtn.current.classList.remove('active');    
    submitBtn.current.classList.remove('active');    
  }  

  const changeStartDatePicker = (newDate) => {
    setStartDate(newDate);
    removeAllActiveStylesInButtons();
  }

  const changeEndDatePicker = (newDate) => {
    setEndDate(newDate);
    removeAllActiveStylesInButtons()
  }

  const removeAllActiveStylesInButtons = () => {
    lastWeekBtn.current.classList.remove('active');    
    lastMonthBtn.current.classList.remove('active');    
    submitBtn.current.classList.remove('active');       
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
            <DatePicker value={startDate} onChange={(newDate) => changeStartDatePicker(newDate)} label="Od" />
            <DatePicker className="end-date-picker" value={endDate} onChange={(newDate) => changeEndDatePicker(newDate)} label="Do" />
            <button className="submit-date-range" ref={submitBtn} onClick={submitDateRange}>Zatwierdź</button>
            <hr />
            <div className="quick-date-ranges">
              <button className="last-month active" ref={lastMonthBtn} onClick={setLastMonth}>Ostatni miesiąc</button>
              <button className="last-week" ref={lastWeekBtn} onClick={setLastWeek}>Ostatni tydzień</button>
            </div>    

          </div>
          {isPending && <Loader />}
          <MaterialReactTable table={table} />
        </div>
      )}
    </div>
  );
};
export default MedCount;
