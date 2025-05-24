import "./Documents.css";

function Documents() {
  return (
    <div className="documentsContainer">
      <div className="type">
        <h1 className="title">Documents</h1>
        <div className="btnNav">
          <button>All Documents</button>
          <button>Receipts</button>
          <button>Contracts</button>
          <button>Other</button>
          <button>Other</button>
        </div>
      </div>
      <div className="upload"></div>
      <h1>All Receipts</h1>
    </div>
  );
}

export default Documents;
