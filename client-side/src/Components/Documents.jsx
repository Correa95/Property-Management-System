import "./documents.css";

function Documents() {
  return (
    <div className="documentsContainer">
      <div className="type">
        <h1>Documents</h1>
        <button>All Documents</button>
        <button>Receipts</button>
        <button>Contracts</button>
        <button>Other</button>
        <button>Other</button>
      </div>
      <div className="upload"></div>
      <h1>All Receipts</h1>
      <table>
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
  );
}

export default Documents;
