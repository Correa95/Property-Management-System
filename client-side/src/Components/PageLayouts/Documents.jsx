import "./Documents.css";

function Documents() {
  return (
    <div className="documentsContainer">
      {/* <div className="type"> */}
      <div className="btnNav">
        <h2 className="documentsTitle">Documents</h2>
        <button>All Documents</button>
        <button>Receipts</button>
        <button>Contracts</button>
        <button>Other</button>
      </div>

      <div className="upload"></div>
      {/* <h1>All Receipts</h1> */}
    </div>
  );
}

export default Documents;
