import "./Documents.css";
import { FiDownload, FiTrash2 } from "react-icons/fi"; 

function Documents() {
  return (
    <div className="documentsContainer">
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
            <input type="file" />
          </label>
        </form>
      </div>

      <div className="documents">
        <h3>All Receipts</h3>
        <div className="docList">
          <ul className="list">
            <li>
              <input type="checkbox" />
            </li>
            <li>DocName</li>
            <li>Type</li>
            <li>Size</li>
            <li>Owner name</li>
            <li>
              <button className="downloadBtn">
                <FiDownload /> Download
              </button>
            </li>
            <li>
              <button className="deleteBtn">
                <FiTrash2 /> Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Documents;
