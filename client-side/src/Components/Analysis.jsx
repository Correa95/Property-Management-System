import { useState, useEffect } from "react";
import "./Analysis.css";
// Utility to format dates as "Month Year" (e.g., "May 2025")
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

function Analysis() {
  const [monthlyRevenue, setMonthlyRevenue] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [totalUnit, setTotalUnits] = useState(null);
  // const fetchMonthlyRevenue = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/v1/getPayments"); // Replace with your endpoint
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch transactions");
  //     }
  //     const revenue = await response.json();

  //     const revenueByMonth = {};
  //     revenue.forEach((payment) => {
  //       const monthKey = formatMonthYear(payment.date);
  //       const amount = Number(payment.amount);

  //       if (!revenueByMonth[monthKey]) {
  //         revenueByMonth[monthKey] = 0;
  //       }

  //       revenueByMonth[monthKey] += amount;
  //     });

  //     setMonthlyRevenue(revenueByMonth);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchMonthlyRevenue();
  // }, []);

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
        <div className="fugure">
          <amount className="dollarAmount">${monthlyRevenue}</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Tenants</h1>
        <div className="figure">
          <amount className="dollarAmount">{occupancyRate}%</amount>
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
