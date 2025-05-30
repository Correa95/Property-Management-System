import "./Documents.css";
import { useState, useEffect } from "react";

import { FiDownload, FiTrash2 } from "react-icons/fi";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("invoice");
  const [name, setName] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents/"); // Update with your API URL
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error("Error loading documents", err);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (!name) setName(e.target.files[0].name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("name", name || file.name);
    formData.append("document_type", documentType);
    formData.append("uploaded_file", file);

    try {
      const res = await fetch("/api/documents/create/", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        setName("");
        setDocumentType("invoice");
        fetchDocuments();
      } else {
        const errorData = await res.json();
        alert("Upload failed: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      const res = await fetch(`/api/documents/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        fetchDocuments();
      } else {
        alert("Failed to delete document.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
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
        <form onSubmit={handleUpload} className="formUpload">
          <input
            type="text"
            placeholder="Document Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="docNameInput"
          />
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="select"
          >
            <option value="invoice">Invoice</option>
            <option value="receipt">Receipt</option>
            <option value="lease_agreement">Lease Agreement</option>
            <option value="other">Other</option>
          </select>
          <label className="docLabel">
            <input
              type="file"
              onChange={handleFileChange}
              className="fileInput"
            />
            Choose File
          </label>
          <button type="submit" className="btnDoc">
            Upload
          </button>
        </form>
      </div>

      <div className="documents">
        <h3>All Receipts</h3>
        <div className="docList">
          {documents.length === 0 && <p>No documents uploaded yet.</p>}
          {documents.map((document) => (
            <ul key={document.id} className="list">
              <li>
                <input type="checkbox" />
              </li>
              <li>{document.name}</li>
              <li>{document.document_type}</li>
              <li>
                {document.uploaded_file
                  ? `${(document.uploaded_file.size / 1024).toFixed(1)} KB`
                  : "N/A"}
              </li>
              <li>
                {document.tenant
                  ? `${document.tenant.first_name} ${document.tenant.last_name}`
                  : "N/A"}
              </li>
              <li>
                <a
                  href={document.uploaded_file}
                  download
                  target="_blank"
                  className="downloadBtn"
                >
                  <FiDownload /> Download
                </a>
              </li>
              <li>
                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(document.id)}
                >
                  <FiTrash2 /> Delete
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Documents;
