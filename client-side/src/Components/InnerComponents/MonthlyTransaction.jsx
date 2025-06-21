import { useState, useRef, useEffect } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import "./MonthlyTransaction.css";

function MonthlyTransaction() {
  const [isOpen, setIsOpen] = useState(true);
  const [payment, setPayment] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(4); // May (0-based)
  const [selectedYear, setSelectedYear] = useState(2025);
  const contentRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/payment")
      .then((res) => res.json())
      .then((data) => setPayment(data))
      .catch((error) => console.log(error));
  }, []);

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
      element.download = `Monthly_Transaction_Statement_${
        selectedMonth + 1
      }_${selectedYear}.txt`;
      document.body.appendChild(element);
      element.click();
    }
  }

  const filteredPayments = payment.filter((p) => {
    const date = new Date(p.paymentDate);
    return (
      date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
    );
  });

  let balance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  const rows = filteredPayments.map((p, index) => {
    const dateStr = new Date(p.paymentDate).toLocaleDateString("en-US");
    const amount = Number(p.paymentAmount) || 0;
    const isIncome = amount > 0;
    const income = isIncome ? amount : 0;
    const expense = isIncome ? 0 : Math.abs(amount);

    totalIncome += income;
    totalExpense += expense;
    balance += income - expense;

    return (
      <tr key={index}>
        <td>{dateStr}</td>
        <td>{p.description || (isIncome ? "Rent Received" : "Expense")}</td>
        <td>{isIncome ? income.toFixed(2) : ""}</td>
        <td>{!isIncome ? expense.toFixed(2) : ""}</td>
        <td>{balance.toFixed(2)}</td>
      </tr>
    );
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="monthlyStatementContainer">
      <div className="monthlyStatement">
        <div className="statementHeader" onClick={handleToggle}>
          <h2 className="statementMonth">
            {monthNames[selectedMonth]} {selectedYear}
            <span className={`icon ${isOpen ? "open" : ""}`}>
              {isOpen ? "−" : "+"}
            </span>
          </h2>
        </div>

        {isOpen && (
          <div className="statementContent show" ref={contentRef}>
            <div className="actionContainer">
              <div className="filterByDate">
                <label>
                  Month:
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  >
                    {monthNames.map((name, index) => (
                      <option key={index} value={index}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Year:
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {[2024, 2025, 2026].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="btnActions">
                <button className="btnDownLoad" onClick={handleDownload}>
                  <FiDownload /> Download
                </button>
                <button className="btnPrint" onClick={handlePrint}>
                  <FiPrinter /> Print
                </button>
              </div>
            </div>
            <h1 className="statementTitle">
              Property Management Transaction Statement
            </h1>

            <div className="statement">
              <div className="sectionInfo">
                <h2>Statement Details</h2>
                <p>
                  <strong>Period:</strong> {monthNames[selectedMonth]} 1 –{" "}
                  {monthNames[selectedMonth]} 30, {selectedYear}
                </p>
                <p>
                  <strong>Prepared For:</strong> Software Developer Job, 123
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
              <tbody>{rows}</tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">Monthly Totals</td>
                  <td>{totalIncome.toFixed(2)}</td>
                  <td>{totalExpense.toFixed(2)}</td>
                  <td>{(totalIncome - totalExpense).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default MonthlyTransaction;
