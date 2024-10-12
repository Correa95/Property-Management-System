import MonthlyCashFlowStatement from "./MonthlyCashFlowStatement";
import Monthlytransaction from "./Monthlytransaction";

function MonthlyStatement() {
  return (
    <>
      <Monthlytransaction />
      <MonthlyCashFlowStatement />
    </>
  );
}

export default MonthlyStatement;
