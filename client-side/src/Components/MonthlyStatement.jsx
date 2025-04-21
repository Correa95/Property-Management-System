import MonthlyCashFlowStatement from "./MonthlyCashFlowStatement";
import Monthlytransaction from "./MonthlyTransaction";

function MonthlyStatement() {
  return (
    <>
      <Monthlytransaction />
      <MonthlyCashFlowStatement />
    </>
  );
}

export default MonthlyStatement;
