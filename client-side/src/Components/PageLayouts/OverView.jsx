import Analysis from "../InnerComponents/Analysis";
// import Charts from "../InnerComponents/Charts";
// import RecentTransaction from "../InnerComponents/RecentTransaction";
import NavBar from "../NavigationBars/NavBar";
import "./OverView.css";
function OverView() {
  return (
    <div className="overViewContainer">
      <div className="navComponent">
        <NavBar />
      </div>
      <h1 className="overViewHeader">Overview</h1>
      <div className="container">
        <div className="box">
          {" "}
          <Analysis />
        </div>
        <div className="box">{/* <Charts /> */}</div>
        <div className="box">{/* <Charts /> */}</div>
      </div>
    </div>
  );
}

export default OverView;
