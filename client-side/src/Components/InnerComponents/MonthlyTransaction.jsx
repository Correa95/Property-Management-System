import { useState, useRef, useEffect } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import "./MonthlyTransaction.css";

function MonthlyTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  const [apartmentComplex, setApartmentComplex] = useState([]);
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    fetch("http//localhost:3000/api/v1/payment")
      .then((res) => res.json())
      .then((data) => setPayment(data))
      .catch((error) => console.log(error));

    fetch("http//localhost:3000/api/v1/apartmentComplex")
      .then((res) => res.json())
      .then((data) => setApartmentComplex(data))
      .catch((error) => console.log(error));
  }, []);
  const contentRef = useRef(null);
  const handleToggle = () => setIsOpen(!isOpen);

  function handlePrint() {
    if (contentRef.current) {
      const printContent = contentRef.current.innerHTML;
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head><title>Print Statement</title></head>
          <body>${printContent}</body>
        </html>
      `);
      newWindow.document.close();
      newWindow.print();
    }
  }
  function handleDownload() {
    if (contentRef.current) {
      const element = document.createElement("a");
      const file = new Blob([contentRef.current.innerText], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "Monthly_Transaction_Statement.txt";
      document.body.appendChild(element);
      element.click();
    }
  }
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
        {/* <div className="btnActions">
          <button className="btnDownLoad" onClick={handleDownload}>
            <FiDownload /> Download
          </button>
          <button className="btnPrint" onClick={handlePrint}>
            <FiPrinter /> Print
          </button>
        </div> */}

        <div
          className={`statementContent ${isOpen ? "show" : ""}`}
          ref={contentRef}
        >
          <h1 className="statementTitle">
            Property Management Transaction Statement
          </h1>

          <div className="btnActions">
            <button className="btnDownLoad" onClick={handleDownload}>
              <FiDownload /> Download
            </button>
            <button className="btnPrint" onClick={handlePrint}>
              <FiPrinter /> Print
            </button>
          </div>
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
              {apartmentComplex.map((apartment) => {
                <>
                  <h2>Property Information</h2>
                  <p>
                    <strong>Address:</strong>
                    {apartment.address}
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
                </>;
              })}
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
        </div>
      </div>
    </section>
  );
}

export default MonthlyTransaction;
