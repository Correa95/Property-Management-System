import { useState, useEffect } from "react";
import "./Analysis.css";
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

function Analysis() {
  const [tenants, setTenants] = useState([]);
  // const [monthlyPayments, setMonthlyPayments] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/tenant")
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((error) => console.error("Error fetching tenants:", error));
  }, []);

  // useEffect(() => {
  //   const fetchMonthlyPayments = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8000/api/v1/getPayments"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch Payments");
  //       }

  //       const payments = await response.json();
  //       console.log(payments);

  //       if (!Array.isArray(payments)) {
  //         throw new Error("Unexpected data format");
  //       }

  //       const paymentMonth = {};
  //       payments.forEach((payment) => {
  //         const month = formatMonthYear(payment.date);
  //         const amount = Number(payment.amount);
  //         if (!paymentMonth[month]) {
  //           paymentMonth[month] = 0;
  //         }
  //         paymentMonth[month] += amount;
  //       });

  //       setMonthlyPayments(paymentMonth);
  //     } catch (err) {
  //       console.error(err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMonthlyPayments();
  // }, []);

  // if (loading) return <p>Loading revenue...</p>;
  // if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  return (
    <section className="statsContainer">
      <div className="stats">
        <h1 className="titleHeader">Rent Received</h1>
        <div className="figure">
          <amount className="dollarAmount">month</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Tenants</h1>
        <div className="figure">
          <amount className="dollarAmount">{tenants.length}</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      {/* <div className="stats">
        <h1 className="titleHeader">Rent Overdue</h1>
        <div className="figure">
          <amount className="dollarAmount">$250000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Expenses</h1>
        <div className="figure">
          <amount className="dollarAmount">$250000</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div> */}
    </section>
  );
}

export default Analysis;
