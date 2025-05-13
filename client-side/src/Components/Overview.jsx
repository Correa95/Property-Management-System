import Analysis from "./Analysis";
import Charts from "./Charts";
import RecentTransaction from "./RecentTransaction";
import NaveBar from "./NavBar";
import "./OverView.css";
function OverView() {
  return (
    <div className="overViewContainer">
      <NaveBar />
      <h1 className="overViewHeader">Overview</h1>
      <div className="container">
        <div className="box">
          <Analysis />
        </div>
        <div className="box">
          <Analysis />
        </div>
        <div className="box">
          <Charts />
        </div>
        <div className="box">
          <Charts />
        </div>
      </div>
    </div>
  );
}

export default OverView;
