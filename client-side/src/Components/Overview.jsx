import Analysis from "./Analysis";
import Charts from "./Charts";
import RecentTransactions from "./RecentTransactions";
import "./OverView.css";
function Overview() {
  return (
    <div className="overViewContainer">
      <Analysis />
      <Charts />
      <RecentTransactions />
    </div>
  );
}

export default Overview;
