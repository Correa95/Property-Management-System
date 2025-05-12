import Analysis from "./Analysis";
// import Charts from "./Charts";
// import RecentTransaction from "./RecentTransaction";
import NaveBar from "./NavBar";
import "./OverView.css";
function OverView() {
  return (
    <div className="overViewContainer">
      <NaveBar />
      <div className="container">
        <Analysis />
        {/* <Charts />
        <RecentTransaction /> */}
      </div>

      {/* <h1>MATHEW</h1> */}
    </div>
  );
}

export default OverView;
