import React, { useState } from "react";

const PdfUploadModal = ({ isOpen, onClose }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === "application/pdf");

    if (validFiles.length !== files.length) {
      alert("Some files were not valid PDFs and were ignored.");
    }

    setPdfFiles(validFiles);
  };

  const handleButtonClick = () => {
    document.getElementById("pdfUpload").click();
  };

  const handlePdfUpload = async () => {
    if (pdfFiles.length === 0) {
      alert("Please select at least one PDF file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    pdfFiles.forEach(file => formData.append("pdfs", file));
    formData.append("date", new Date().toISOString().split("T")[0]);

    const access_token = localStorage.getItem("access_token");

    try {
      const res = await fetch("http://51.20.246.38:5000/api/upload_documents_bulk", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("PDFs uploaded successfully!");
        setPdfFiles([]);
        onClose();
      } else {
        alert(data?.message || "Failed to upload PDFs");
      }
    } catch (error) {
      console.error("Error uploading PDFs:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPdfFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="createUserModalHeadingandBtn">
          <div className="createUserModalHeading">
            <h4>PDF Upload</h4>
          </div>
          <div className="createUserModalButton">
            <button onClick={onClose}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>

        <hr />

        <div className="createUserUploadBulk">
          <div className="bulk">
            <div className="bulkicon">
              <i className="fa-solid fa-cloud-arrow-up"></i>
            </div>

            <h1>Upload PDFs</h1>
            <h2>Drag and Drop or Add Multiple Files</h2>

            <input
              id="pdfUpload"
              type="file"
              accept=".pdf"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <label htmlFor="pdfUpload">
              <button
                onClick={handleButtonClick}
                disabled={loading}
                type="button"
              >
                {loading ? "Uploading..." : "Upload Files from your Device"}
              </button>
            </label>

            {pdfFiles.length > 0 && (
              <div className="selectedFileList">
                <p>Selected files:</p>
                <ul>
                  {pdfFiles.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <p>Support Format: PDF</p>
          </div>
        </div>

        <div className="closeDoneBtn">
          <button onClick={handleClose} className="closeBtn">
            Close
          </button>
          <button
            onClick={handlePdfUpload}
            className="doneBTn"
            disabled={loading || pdfFiles.length === 0}
          >
            {loading ? "Uploading..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfUploadModal;
