import { useEffect, useState } from "react";
import "./RecentTransaction.css";
import { useNavigate } from "react-router-dom";

function RecentTransac() {
  const navigate = useNavigate();
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
        {payments.slice(0, 10).map((payment) => (
          <li key={payment.id} className="transactionItem">
            <li>${payment.paymentAmount}</li>
            <li>{new Date(payment.paymentDate).toLocaleDateString()}</li>
            <li>{payment.paymentMethod}</li>
            <li>{payment.paymentStatus}</li>
            <li>{payment.isLatePayment}</li>
          </li>
        ))}
      </ul>
      <button
        className="btnMore"
        onClick={() => navigate("/recentTransactions")}
      >
        See More
      </button>
    </div>
  );
}

export default RecentTransac;
