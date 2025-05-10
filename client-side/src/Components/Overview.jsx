import Analysis from "./Analysis";
import Charts from "./Charts";
import RecentTransaction from "./RecentTransaction";
import "./OverView.css";
function Overview() {
  return (
    <div className="overViewContainer">
      <Analysis />
      <Charts />
      <RecentTransaction />
    </div>
  );
}

export default Overview;
