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

      <div className="upload">
        <form>
          <label>
            <input
              type="file"
              // multiple
              // accept="*/*"
              // placeholder="Choose a file or drag and drop here"
            />
          </label>
        </form>
      </div>
      <div className="documents">
        <h3>All Receipts</h3>
        <div className="docList">
          <ul className="list">
            <ol>
              <input type="checkbox" />
            </ol>
            <ol>DocName</ol>
            <ol>Type</ol>
            <ol>Size</ol>
            <ol>Owner name</ol>
            <ol>
              <button>Download</button>
            </ol>
            <ol>
              <button>Delete</button>
            </ol>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Documents;
