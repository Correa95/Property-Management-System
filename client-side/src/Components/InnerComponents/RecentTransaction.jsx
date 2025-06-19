import { useEffect, useState } from "react";
import "./RecentTransaction.css";

function RecentTransac() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/payment")
      .then((res) => res.json())
      .then((data) => {
        const sortByDate = data.sort(
          (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
        );
        setPayments(sortByDate);
      })
      .catch((error) => {
        setError("Failed to load payments");
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="transactionContainer">
      {error && <p>{error}</p>}
      <ul className="recentTransactionList">
        {payments.slice(0, 3).map((payment) => (
          <li key={payment.id} className="transactionItem">
            <span>${payment.paymentAmount}</span>
            <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
            <span>{payment.paymentMethod}</span>
            <span>{payment.paymentStatus}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTransac;
