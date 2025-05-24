import "./Documents.css";

function Documents() {
  return (
    <div className="documentsContainer">
      <div className="type">
        <h1 className="title">Documents</h1>
        <ul className="btnNav">
          <ol>All Documents</ol>
          <ol>Receipts</ol>
          <ol>Contracts</ol>
          <ol>Other</ol>
          <ol>Other</ol>
        </ul>
      </div>
      <div className="upload"></div>
      <h1>All Receipts</h1>
    </div>
  );
}

export default Documents;
