import { useEffect, useState } from "react";
import "./Units.css";

function Units() {
  const [error, setError] = useState(null);
  const [units, setUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const unitsPerPage = 15;

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/apartment")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch units");
        return res.json();
      })
      .then((data) => setUnits(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = units.slice(indexOfFirstUnit, indexOfLastUnit);
  const totalPages = Math.ceil(units.length / unitsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="unitsContainer">
      <h1 className="unitsHeader">All Units</h1>
      {error && <p className="error">{error}</p>}
      <div className="unitsTableContainer">
        <table className="unitsTable">
          <thead>
            <tr>
              <th>Building Number</th>
              <th>Unit Number</th>
              <th>Bedrooms</th>
              <th>Sq Ft</th>
              <th>Rent Amount</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {units.length === 0 ? (
              <tr>
                <td colSpan="6">You have no units available.</td>
              </tr>
            ) : (
              currentUnits.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.buildingNumber}</td>
                  <td>{unit.unitNumber}</td>
                  <td>{unit.numBedrooms}</td>
                  <td>{unit.squareFootage}</td>
                  <td>${unit.rentAmount}</td>
                  <td>{unit.isAvailable ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {units.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Units;
