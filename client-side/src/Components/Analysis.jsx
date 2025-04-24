import "./Analysis.css";
function Analysis() {
  return (
    <section className="statsContainer">
      <div className="stats">
        <h1>Vacancy Rate</h1>
        <amount className="dollarAmount">100%</amount>
        <small>As of Last Month</small>
      </div>
      <div className="stats">
        <h1>Total Rent Collected</h1>
        <amount className="dollarAmount">$100000</amount>
        <small>As of Last Month</small>
      </div>
      <div className="stats">
        <h1>Total Expenses</h1>
        <amount className="dollarAmount">$250000</amount>
        <small className="timeUpdate">As of Last Month</small>
      </div>
    </section>
  );
}

export default Analysis;
