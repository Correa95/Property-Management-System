import Analysis from "./Analysis";
import Charts from "./Charts";
import RecentTransactions from "./RecentTransactions";
import "./OverView.css";
function OverView() {
  return (
    <div className="overViewContainer">
      <Analysis />
      <Charts />
      <RecentTransactions />

      <h1>MATHEW</h1>
    </div>
  );
}

export default OverView;
