import useFetchGet from "../../utilities/useFetchGet";
import Set from "./Set";

const List = () => {
  const { result: sets } = useFetchGet("/api/MedicationSet/GetSets");

  return (
    <div className="set-list">
      {sets?.map((set) => (
        <Set key={set.id} id={set.id} name={set.name} meds={set.meds} />
      ))}
    </div>
  );
};
export default List;
