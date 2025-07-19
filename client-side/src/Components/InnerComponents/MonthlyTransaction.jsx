import { useState, useRef, useEffect } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import "./MonthlyTransaction.css";

function MonthlyTransaction() {
  const [isOpen, setIsOpen] = useState(true);
  const [payment, setPayment] = useState([]);
  const [complexInfo, setComplexInfo] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(4);
  const [selectedYear, setSelectedYear] = useState(2025);
  const contentRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/v1/payment`)
      .then((res) => res.json())
      .then((data) => setPayment(data))
      .catch((error) => console.log(error));

    fetch(`${import.meta.env.VITE_API_URL}api/v1/complex`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Apartment Complex Info:", data);
        setComplexInfo(Array.isArray(data) ? data : [data]);
      })
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

  const filteredPayments = payment.filter((payment) => {
    const date = new Date(payment.paymentDate);
    return (
      date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
    );
  });

  let balance = 0,
    totalIncome = 0,
    totalExpense = 0;

  const rows = filteredPayments.map((payment, index) => {
    const date = new Date(payment.paymentDate).toLocaleDateString("en-US");
    const amount = Number(payment.paymentAmount) || 0;
    const isIncome = amount > 0;
    const income = isIncome ? amount : 0;
    const expense = isIncome ? 0 : Math.abs(amount);

    totalIncome += income;
    totalExpense += expense;
    balance += income - expense;

    return (
      <tr key={index}>
        <td>{date}</td>
        <td>
          {payment.description || (isIncome ? "Rent Received" : "Expense")}
        </td>
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
          <div className="tableWrapper">
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

              {complexInfo.length > 0 ? (
                complexInfo.map((info, idx) => (
                  <div key={idx}>
                    <h1 className="statementTitle">
                      {info.name} Monthly Transaction Statement
                    </h1>
                    <div className="statement">
                      <div className="sectionInfo">
                        <h2>Statement Details</h2>
                        <p>
                          <strong>Period:</strong> {monthNames[selectedMonth]} 1
                          – {monthNames[selectedMonth]} 30, {selectedYear}
                        </p>
                        <p>
                          <strong>Prepared For:</strong> Software Developer Job,
                          123 Corporate America
                        </p>
                        <p>
                          <strong>Managed By:</strong> Mathew M Correa
                        </p>
                      </div>
                      <div className="sectionInfo">
                        <h2>{info.name} Address</h2>
                        <p>
                          <strong>Street:</strong> {info.street}
                        </p>
                        <p>
                          <strong>City:</strong> {info.city}
                        </p>
                        <p>
                          <strong>ZipCode:</strong> {info.zipcode}
                        </p>
                        <p>
                          <strong>State:</strong> {info.state}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No complex information available.</p>
              )}

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
          </div>
        )}
      </div>
    </section>
  );
}

export default MonthlyTransaction;
