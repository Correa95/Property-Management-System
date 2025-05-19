import { useState, useEffect } from "react";
import "./Analysis.css";
function Analysis() {
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function getPayments() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/getPayments", {
          signal,
        });
        const data = await res.json();
        console.log("Payments response ↴", data);
        setPayments(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }
    getPayments();
    return () => controller.abort();
  }, []);

  /* ─────────────────────────── UI ─────────────────────────── */
  if (loading) return <p>Loading payments…</p>;
  if (error) return <p style={{ color: "red" }}>{error.message}</p>;
  if (!payments?.length) return <p>No payments found.</p>;
  return (
    <section className="statsContainer">
      <div className="stats">
        <h1 className="titleHeader">Rent Received</h1>
        <div className="fugure">
          <amount className="dollarAmount">100%</amount>
          <small className="timeStamp">As of Last Month</small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Total Tenants</h1>
        <div className="figure">
          <amount className="dollarAmount">$100000</amount>
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
