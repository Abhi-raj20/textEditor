// import React from "react";
// import "./pdfcheck.css";
// import pdfImg from "../../../assest/Rectangle.png"

// const PdfCheck = () => {
//   return (
//     <>
//       <div className="pdfCheckContainer">
//         <div className="textEditorTop">
//           <div className="textEditorTopLeft">
//             <i class="fa-solid fa-angle-left"></i>
//             <h3>Client_Proposal_April2025.pdf</h3>
//           </div>
//           <div className="editorTopRightBtn">
//             <button className="save">Save</button>
//             <button className="done">Done</button>
//           </div>
//         </div>

//         <hr />

//         <div className="pdfCheckPagesDetails">
//           <div className="pdfCheckPagesDetailsLeft">
//             <div className="pdfCheckTotalPage">
//               <h3>Total Page :</h3>
//               <h2>210</h2>
//             </div>
//             <div className="pdfCheckTotalPage">
//               <h3>Unchecked Pages :</h3>
//               <h2>150</h2>
//             </div>
//             <div className="pdfCheckTotalPage">
//               <h3>Checked Pages :</h3>
//               <h2>60</h2>
//             </div>
//           </div>
//           <div className="pdfCheckPagesDetailsRight">
//             <div className="search-box">
//               <i className="fas fa-search search-icon"></i>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search..."
//               />
//             </div>
//           </div>
//         </div>


//         <div className="mainCheckContainer">
//             <div className="checkContainer">
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//                 <div className="checkContainerCard">
//                     <div className="ceckerCheckbox">

//                     </div>

//                     <div className="checkerPdfImg">
//                         <img src={pdfImg} alt="" />
//                     </div>

//                     <div className="checkerpagetext">
//                         <h4>Page1</h4>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PdfCheck;


import React, { useState, useEffect } from "react";
import "./pdfcheck.css";
import pdfImg from "../../../assest/Rectangle.png";
import axios from "axios";

const PdfCheck = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedPages, setCheckedPages] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      setLoading(true);
      const config = {
        method: "get",
        url: "http://51.20.246.38:5000/api/checker_document_list",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${access_token}`,
        },
      };

      const response = await axios.request(config);
      // Handle the specific response format
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserData(response.data[0]);
      } else {
        setError("No data available");
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to load documents. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (pageId) => {
    setCheckedPages((prevChecked) => {
      if (prevChecked.includes(pageId)) {
        return prevChecked.filter((id) => id !== pageId);
      } else {
        return [...prevChecked, pageId];
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter PDF info based on search term
  const filteredPdfInfo = userData?.pdf_info
    ? userData.pdf_info.filter((pdf) =>
        pdf.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Calculate stats based on API response
  const totalPages = userData?.pages_assigned || 0;
  const totalChecked = userData?.pages_completed || 0;
  const totalUnchecked = userData?.pending_pages || 0;

  // If there's no PDF info, create placeholder data
  const displayPdfPages = filteredPdfInfo.length > 0 
    ? filteredPdfInfo 
    : Array(totalPages).fill().map((_, i) => ({ id: i, name: `Page ${i+1}` }));

  return (
    <>
      <div className="pdfCheckContainer">
        <div className="textEditorTop">
          <div className="textEditorTopLeft">
            <i className="fa-solid fa-angle-left"></i>
            <h3>Client_Proposal_April2025.pdf</h3>
          </div>
          <div className="editorTopRightBtn">
            <button className="save">Save</button>
            <button className="done">Done</button>
          </div>
        </div>

        <hr />

        <div className="pdfCheckPagesDetails">
          <div className="pdfCheckPagesDetailsLeft">
            <div className="pdfCheckTotalPage">
              <h3>Total Pages:</h3>
              <h2>{totalPages}</h2>
            </div>
            <div className="pdfCheckTotalPage">
              <h3>Unchecked Pages:</h3>
              <h2>{totalUnchecked}</h2>
            </div>
            <div className="pdfCheckTotalPage">
              <h3>Checked Pages:</h3>
              <h2>{totalChecked}</h2>
            </div>
          </div>
          <div className="pdfCheckPagesDetailsRight">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="mainCheckContainer">
          {loading ? (
            <div className="loading-message">Loading documents...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="checkContainer">
              {displayPdfPages.length > 0 ? (
                displayPdfPages.map((item, index) => (
                  <div className="checkContainerCard" key={item.id || index}>
                    <div className="ceckerCheckbox">
                      <input
                        type="checkbox"
                        checked={checkedPages.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </div>

                    <div className="checkerPdfImg">
                      <img 
                        src={item.thumbnail_url || pdfImg} 
                        alt={`Page ${index + 1}`} 
                        onError={(e) => {e.target.src = pdfImg}}
                      />
                    </div>

                    <div className="checkerpagetext">
                      <h4>{item.name || `Page ${index + 1}`}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-documents">
                  No pages found. {searchTerm && "Try a different search term."}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PdfCheck;