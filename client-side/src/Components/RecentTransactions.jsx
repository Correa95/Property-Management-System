import "./RecentTransactions.css";

function RecentTransaction() {
  return (
    <div className="recentTransactionContainer">
      <div className="recentTransaction">
        <h1>Recent Transactions</h1>
        <div className="recentTransactionBtn">
          <button>Record Bill</button>
          <button>Export</button>
        </div>
      </div>

      <div className="recentTransactionTableContainer">
        <table className="recentTransactionTable">
          <thead>
            <tr>
              <th>Ref No</th>
              <th>Tenant</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Memo</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td>Mathew</td>
              <td>2025-06-01</td>
              <td>Paid</td>
              <td>June rent</td>
              <td>$1,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransaction;
