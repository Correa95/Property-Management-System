import { useState, useEffect } from "react";
import "./Analysis.css";

function Analysis() {
  const [apartments, setApartments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [leases, setLeases] = useState([]);

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? "Invalid date"
      : date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/v1/apartment`)
      .then((res) => res.json())
      .then((data) => setApartments(data))
      .catch((error) => console.error("Error fetching tenants:", error));

    fetch(`${import.meta.env.VITE_API_URL}api/v1/payment`)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payments:", error));

    fetch(`${import.meta.env.VITE_API_URL}api/v1/lease`)
      .then((res) => res.json())
      .then((data) => setLeases(data))
      .catch((error) => console.error("Error fetching leases:", error));
  }, []);

  const paymentByMonth = {};
  payments.forEach((payment) => {
    const rawDate = payment.paymentDate;
    const rawAmount = payment.paymentAmount;

    if (!rawDate || isNaN(new Date(rawDate))) return;

    const month = formatMonthYear(rawDate);
    const amount = Number(rawAmount);

    if (!isNaN(amount)) {
      if (!paymentByMonth[month]) {
        paymentByMonth[month] = 0;
      }
      paymentByMonth[month] += amount;
    }
  });

  const months = Object.keys(paymentByMonth);
  const lastMonth = months[months.length - 1];
  const lastMonthTotal = lastMonth ? paymentByMonth[lastMonth] : 0;

  const now = new Date();

  const activeLeases = leases.filter((lease) => {
    const start = new Date(lease.startDate);
    const end = new Date(lease.endDate);
    return start <= now && end >= now;
  });

  const totalUnits = apartments.length;
  const occupiedUnits = activeLeases.length;
  const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

  return (
    <section className="statsContainer">
      <div className="stats">
        <h1 className="titleHeader">Rent Received</h1>
        <div className="figure">
          <span className="dollarAmount">
            ${!isNaN(lastMonthTotal) ? lastMonthTotal.toFixed(2) : "0.00"}
          </span>
          <small className="timeStamp">
            {lastMonth ? `As of ${lastMonth}` : "No Data"}
          </small>
        </div>
      </div>

      <div className="stats">
        <h1 className="titleHeader">Occupancy Rate</h1>
        <div className="figure">
          <span className="dollarAmount">{occupancyRate.toFixed(1)}%</span>
          <small className="timeStamp">
            {`Based on ${occupiedUnits} of ${totalUnits} units`}
          </small>
        </div>
      </div>
    </section>
  );
}

export default Analysis;
