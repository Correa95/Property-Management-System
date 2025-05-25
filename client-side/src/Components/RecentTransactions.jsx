import "./RecentTransaction.css";

function RecentTransaction() {
  return (
    <div className="recent-transaction">
      <div className="recent-transaction__top">
        <h1>Recent Transactions</h1>
        <div className="recent-transaction__actions">
          <button>Record Bill</button>
          <button>Export</button>
        </div>
      </div>
      <div className="recent-transaction__table-wrapper">
        <table className="recent-transaction__table">
          <thead>
            <tr>
              <th>Ref No</th>
              <th>Customer</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Memo</th>
              <th>Amount</th>
              <th>Action</th>
              <th>Header 8</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="empty-row">
                No transactions available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransaction;
