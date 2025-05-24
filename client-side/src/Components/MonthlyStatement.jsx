import MonthlyTransaction from "./MonthlyTransaction";
import "./MonthlyStatement.css";
function MonthlyStatement() {
  return (
    <div className="monthlyStatementContainer">
      <MonthlyTransaction />
    </div>
  );
}

export default MonthlyStatement;
