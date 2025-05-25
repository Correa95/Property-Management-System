import { useState } from "react";
import "./MonthlyTransaction.css";

function MonthlyTransaction() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <section className="monthlyStatementContainer">
      <div className="monthlyStatement">
        <div className="statementHeader" onClick={handleToggle}>
          <h2 className="statementMonth">
            January
            <span className={`icon ${isOpen ? "open" : ""}`}>
              {isOpen ? "−" : "+"}
            </span>
          </h2>
        </div>

        <div className={`statementContent ${isOpen ? "show" : ""}`}>
          <h1 className="statementTitle">
            Property Management Transaction Statement
          </h1>
          <div className="statement">
            <div className="sectionInfo">
              <h2>Statement Details</h2>
              <p>
                <strong>Period:</strong> May 1 – May 30, 2025
              </p>
              <p>
                <strong>Prepared For:</strong>Software Developer Job, 123
                Corporate America
              </p>
              <p>
                <strong>Managed By:</strong> Caleb Curry
              </p>
            </div>

            <div className="sectionInfo">
              <h2>Property Information</h2>
              <p>
                <strong>Address:</strong> Code Breakthrough Mentorship Program
              </p>
              <p>
                <strong>Tenant:</strong> Mathew M Correa
              </p>
              <p>
                <strong>Lease:</strong> March 28 – Dec 31, 2025
              </p>
              <p>
                <strong>Rent:</strong> $3000
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
                <td>Rent Received</td>
                <td>1,200</td>
                <td></td>
                <td>1,200</td>
              </tr>
              <tr>
                <td>04/03/2025</td>
                <td>Management Fee</td>
                <td></td>
                <td>120</td>
                <td>1,080</td>
              </tr>
              <tr>
                <td>04/10/2025</td>
                <td>Plumbing Repair</td>
                <td></td>
                <td>150</td>
                <td>930</td>
              </tr>
              <tr>
                <td>04/20/2025</td>
                <td>Lawn Maintenance</td>
                <td></td>
                <td>75</td>
                <td>855</td>
              </tr>
              <tr>
                <td>04/30/2025</td>
                <td>Owner Disbursement</td>
                <td></td>
                <td>855</td>
                <td>0</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Monthly Totals</td>
                <td>1,200</td>
                <td>1,200</td>
                <td>0</td>
              </tr>
            </tfoot>
          </table>

          <div className="footer">
            © 2025 Code Breakthrough Mentorship Program – Property Management
            Services
          </div>
        </div>
      </div>
    </section>
  );
}

export default MonthlyTransaction;
