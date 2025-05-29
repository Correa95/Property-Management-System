import { useState, useEffect } from "react";
import "./Analysis.css";
// Utility to format dates as "Month Year" (e.g., "May 2025")
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

function Analysis() {
  const [monthlyPayments, setMonthlyPayments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [tenant, setTenant] = useState(null);
  // const [totalUnit, setTotalUnits] = useState(null);

  useEffect(() => {
    const fetchMonthlyPayments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/getPayments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Payments");
        }
        const payments = await response.json();
        console.log(payments);

        const paymentsByMonth = {};
        payments.forEach((payment) => {
          const month = formatMonthYear(payment.date);
          const amount = Number(payment.amount);

          if (!paymentsByMonth[month]) {
            paymentsByMonth[month] = 0;
          }

          paymentsByMonth[month] += amount;
        });

        setMonthlyPayments(paymentsByMonth);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMonthlyPayments();
  }, []);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   async function getTenants() {
  //     try {
  //       const res = await fetch("http://localhost:8000/api/v1/getTenants", {
  //         signal,
  //       });
  //       const data = await res.json();
  //       console.log("Payments response ↴", data);
  //       setTenant(data);
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getTenants();
  //   return () => controller.abort();
  // }, []);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   async function getUnits() {
  //     try {
  //       const res = await fetch("http://localhost:8000/api/v1/getUnits", {
  //         signal,
  //       });
  //       const data = await res.json();
  //       console.log("Payments response ↴", data);
  //       setTotalUnits(data);
  //     } catch (err) {
  //       if (err.name !== "AbortError") setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getUnits();
  //   return () => controller.abort();
  // }, []);
  // const occupancyRate = (totalUnit / tenant) * 100;

  if (loading) return <p>Loading revenue...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  return (
    <section className="statsContainer">
      <div className="stats">
        <h1 className="titleHeader">Rent Received</h1>
        <div className="figure">
          <amount className="dollarAmount">${paymentsByMonth}</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Tenants</h1>
        <div className="figure">
          <amount className="dollarAmount">Mario</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
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
      </div>
    </section>
  );
}

export default Analysis;
