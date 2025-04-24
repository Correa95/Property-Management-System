import "./Analysis.css";
function Analysis() {
  return (
    <section className="statsContainer">
      <div className="stats">
        <h1 className="titleHeader">Vacancy Rate</h1>
        <amount className="dollarAmount">100%</amount>
        <br />
        <small>As of Last Month</small>
      </div>
      <div className="stats">
        <h1 className="titleHeader">Total Rent Collected</h1>
        <amount className="dollarAmount">$100000</amount>
        <br />
        <small>As of Last Month</small>
      </div>
      <div className="stats">
        <h1 className="titleHeader">Total Expenses</h1>
        <amount className="dollarAmount">$250000</amount>
        <br />
        <small className="timeUpdate">As of Last Month</small>
      </div>
    </section>
  );
}

export default Analysis;
