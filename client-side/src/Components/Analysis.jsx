import "./Analysis.css";
function Analysis() {
  return (
    <section className="statsContainer">
      <div className="stats">
        <h1 className="titleHeader">Rent Received</h1>
        <div className="fugure">
          <amount className="dollarAmount">100%</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Tenants</h1>
        <div className="figure">
          <amount className="dollarAmount">$100000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Rent Overdue</h1>
        <div className="figure">
          <amount className="dollarAmount">$250000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Expenses</h1>
        <div className="figure">
          <amount className="dollarAmount">$250000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>
    </section>
  );
}

export default Analysis;
