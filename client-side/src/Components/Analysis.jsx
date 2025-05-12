import "./Analysis.css";
import { MdPeopleAlt } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
function Analysis() {
  return (
    <section className="statsContainer">
      <div className="stats">
        <div className="icons"></div>

        <div className="figure">
          <h1 className="titleHeader">Rent Received</h1>
          <amount className="dollarAmount">100%</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <div className="icons">
          <MdPeopleAlt />
          <BsThreeDots />
        </div>

        <div className="figure">
          <h1 className="titleHeader">Total Tenants</h1>
          <amount className="dollarAmount">$100000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <div className="icons">
          <MdAttachMoney />
          <BsThreeDots />
        </div>

        <div className="figure">
          <h1 className="titleHeader">Rent Overdue</h1>
          <amount className="dollarAmount">$250000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <div className="icons">
          <GiExpense />
          <BsThreeDots />
        </div>
        <div className="figure">
          <h1 className="titleHeader">Total Expenses</h1>
          <amount className="dollarAmount">$250000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>
    </section>
  );
}

export default Analysis;
