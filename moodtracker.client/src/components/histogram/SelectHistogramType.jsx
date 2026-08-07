
const SelectHistogramType = ({ setType }) => {
  const change = (e) => {
    setType(e.target.value);
  }

  return (
    <form>
      <select onChange={change} name="mood-characteristics" id="mood-characteristics">
        <option value="mood-rate">Ocena nastroju</option>
        <option value="mood-color">Kolor nastroju</option>
      </select>
    </form>
  );
};
export default SelectHistogramType;
