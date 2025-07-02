import { useEffect, useState } from "react";
import { FaPlus, FaFileExport } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./RecentTransactions.css";

function RecentTransaction() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetch(`${process.env.API_URL}3000/api/v1/payment`)
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch payments");
      });
  }, []);

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const pagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="recentTransactionContainer">
      <div className="recentTransaction">
        <h1>Recent Transactions</h1>
        <div className="recentTransactionBtn">
          <button onClick={() => navigate("/payment")}>
            <FaPlus className="icon" /> Record Payment
          </button>
          <button>
            <FaFileExport className="icon" /> Export
          </button>
        </div>
      </div>

      <div className="recentTransactionTableContainer">
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <table className="recentTransactionTable">
              <thead>
                <tr>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Late?</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td>${payment.paymentAmount}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>Rent</td>
                    <td>{payment.isLatePayment ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() => pagination(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => pagination(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => pagination(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecentTransaction;
