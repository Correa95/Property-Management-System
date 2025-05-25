import "./Units.css";

function Units() {
  return (
    <div className="unitsContainer">
      <h1 className="unitsHeader">All Units</h1>
      <div className="unitsTable">
        <table>
          <thead>
            <tr>
              <th>Building Number</th>
              <th>Unit Number</th>
              <th>Num Bedrooms</th>
              <th>Sq Ft</th>
              <th>Rent Amount</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>101</td>
              <td>3</td>
              <td>1100</td>
              <td>2500</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Units;
