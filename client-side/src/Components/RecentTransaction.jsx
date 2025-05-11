function RecentTransaction() {
  return (
    <>
      <div className="recentTransaction">
        <div className="top">
          <h1>Recent Transaction</h1>
          <h2>Record bill</h2>
          <h3>export</h3>
        </div>
      </div>
      <div className="table">
        <table>
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
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecentTransaction;
