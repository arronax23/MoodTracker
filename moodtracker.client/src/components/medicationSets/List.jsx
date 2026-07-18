import useFetchGet from "../../utilities/useFetchGet";
import Set from "./Set";
import { useState }from "react";

const List = () => {
  const [refresh, setRefresh] = useState(false);
  const { result: sets } = useFetchGet("/api/MedicationSet/GetSets", refresh);

  return (
    <div className="set-list">
      {sets?.map((set) => (
        <Set setRefresh={setRefresh} key={set.id} id={set.id} name={set.name} meds={set.meds} />
      ))}
    </div>
  );
};
export default List;
