import Analysis from "./Analysis";
import Charts from "./Charts";
import "./OverView.css";
function Overview() {
  return (
    <div className="overViewContainer">
      <Analysis />
      <Charts />
    </div>
  );
}

export default Overview;
