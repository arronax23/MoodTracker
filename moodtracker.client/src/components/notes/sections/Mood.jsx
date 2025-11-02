const Mood = ({ value }) => {
  return (
    <div className="mood-container">
          <div className="mood-rate-header">Ocena nastroju</div>
          <div className="mood-rate-value">{value}</div>      
    </div>
  )
}
export default Mood