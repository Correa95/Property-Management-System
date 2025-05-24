import { useState } from "react";
import "./MonthlyTransaction.css";

function MonthlyTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(!isOpen);
  }
  return (
    <section className="statementContainer">
      <div className="mario" onClick={handleClose}>
        <h2 className="span">
          January<span>+</span>
        </h2>
        {isOpen && (
          <div className="statementTransaction">
            <h1 className="statementTitle">
              Property Management Transaction Statement
            </h1>
            <div className="statement">
              <div className="sectionInfo">
                <h2>Statement Details</h2>
                <p>
                  <strong>Period:</strong> April 1, 2025 – April 30, 2025
                </p>
                <p>
                  <strong>Prepared For:</strong> John Doe, 123 Main Street,
                  Springfield, IL 62704
                </p>
                <p>
                  <strong>Managed By:</strong> Nayekah Churr LLC, 456 Real
                  Estate Blvd, Chicago, IL 60601
                </p>
              </div>

              <div className="sectionInfo">
                <h2>Property Information</h2>
                <p>
                  <strong>Property Address:</strong> 789 Oak Avenue, Unit 4B,
                  Springfield, IL 62704
                </p>
                <p>
                  <strong>Tenant Name:</strong> Jane Smith
                </p>
                <p>
                  <strong>Lease Period:</strong> Jan 1, 2025 – Dec 31, 2025
                </p>
                <p>
                  <strong>Monthly Rent:</strong> $1,200.00
                </p>
              </div>
            </div>

            <table className="statementTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Income ($)</th>
                  <th>Expense ($)</th>
                  <th>Balance ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>04/01/2025</td>
                  <td>Rent Received (April)</td>
                  <td>1,200.00</td>
                  <td></td>
                  <td>1,200.00</td>
                </tr>
                <tr>
                  <td>04/03/2025</td>
                  <td>Property Management Fee</td>
                  <td></td>
                  <td>120.00</td>
                  <td>1,080.00</td>
                </tr>
                <tr>
                  <td>04/10/2025</td>
                  <td>Plumbing Repair</td>
                  <td></td>
                  <td>150.00</td>
                  <td>930.00</td>
                </tr>
                <tr>
                  <td>04/20/2025</td>
                  <td>Lawn Maintenance</td>
                  <td></td>
                  <td>75.00</td>
                  <td>855.00</td>
                </tr>
                <tr>
                  <td>04/30/2025</td>
                  <td>Owner Disbursement</td>
                  <td></td>
                  <td>855.00</td>
                  <td>0.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Monthly Totals</td>
                  <td>1,200.00</td>
                  <td>1,200.00</td>
                  <td>0.00</td>
                </tr>
              </tfoot>
            </table>

            {/* <div className="notes">
        <h2>Notes</h2>
        <ul>
        <li>Plumbing repair covered emergency fix in bathroom.</li>
        <li>Monthly management fee is 10% of rent collected.</li>
        <li>Owner disbursement transferred via ACH on 04/30/2025.</li>
        </ul>
        </div> */}

            <div className="footer">
              © 2025 Nayekah Churr LLC – Property Management Services
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MonthlyTransaction;
