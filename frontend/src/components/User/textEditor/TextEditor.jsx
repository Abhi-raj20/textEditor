// // import React, { useRef, useState, useMemo } from "react";
// // import "./textEditor.css";
// // import PageImg from "../../../assest/Rectangle.png";
// // import JoditEditor from "jodit-react";

// // const TextEditor = () => {
// //   const editor = useRef(null);
// //   const [content, setContent] = useState("");

// //   //   const config = useMemo(() => ({
// //   //     readonly: false, // all options from https://xdsoft.net/jodit/docs/,
// //   //     placeholder: placeholder || 'Start typings...'
// //   //   }),
// //   //   [placeholder]
// //   // ); 

// //   return (
// //     <div className="textEditorContainer">
// //       <div className="textEditorTop">
// //         <div className="textEditorTopLeft">
// //           <i class="fa-solid fa-angle-left"></i>
// //           <h3>Client_Proposal_April2025.pdf</h3>
// //         </div>
// //         <div className="editorTopRightBtn">
// //           <button className="save">Save</button>
// //           <button className="done">Done</button>
// //         </div>
// //       </div>

// //       <div className="textEditorMiddle">
// //         <div className="textEditorleftImg">
// //           <div className="middleLeft">
// //             <div className="textEditorLeftFilter">
// //               <h4>Filter</h4>
// //               <i class="fa-solid fa-filter"></i>
// //             </div>
// //             <div className="leftEditorTop">
// //               <div className="edtiorTotalPage">
// //                 <h4>Total Page</h4>
// //                 <h4>50</h4>
// //               </div>
// //               <div className="editorPages">
// //                 <h4>Pending Page</h4>
// //                 <h4 className="front">25</h4>
// //               </div>
// //               <div className="editorPages">
// //                 <h4>Completed Page</h4>
// //                 <h4 className="front2">25</h4>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="middleRight">
// //             <div className="scrollWrapper">
// //               {" "}
// //               {/* NEW wrapper */}
// //               <div className="textEditorLeftPageListing">
// //                 <div className="imgListing">
// //                   <img src={PageImg} alt="" />
// //                   <h4>Page 1</h4>
// //                 </div>
// //                 <div className="imgListing">
// //                   <img src={PageImg} alt="" />
// //                   <h4>Page 1</h4>
// //                 </div>
// //                 <div className="imgListing">
// //                   <img src={PageImg} alt="" />
// //                   <h4>Page 1</h4>
// //                 </div>
// //                 <div className="imgListing">
// //                   <img src={PageImg} alt="" />
// //                   <h4>Page 1</h4>
// //                 </div>
// //                 <div className="imgListing">
// //                   <img src={PageImg} alt="" />
// //                   <h4>Page 1</h4>
// //                 </div>
// //                 <div className="imgListing">
// //                   <img src={PageImg} alt="" />
// //                   <h4>Page 1</h4>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="image-and-textEditor">
        
// //         <div className="textEditorImgMiddle">
// //           <div className="middleTextEditorImg">
// //             <img src={PageImg} alt="" />
// //           </div>
// //           <div className="middleTextPageNO">
// //             <i class="fa-solid fa-angle-left"></i>
// //             <h4>Page 4</h4>
// //             <i class="fa-solid fa-angle-right"></i>
// //           </div>
// //         </div>

// //         <div className="textEditorContentRight">
// //           <div className="editorContainer">
// //             <h4>Typography</h4>

// //             <JoditEditor
// //               ref={editor}
// //               value={content}
// //               // config={config}
// //               tabIndex={1} // tabIndex of textarea
// //               onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
// //               onChange={(newContent) => {}}
// //               width='50%'

// //             />



// //             {/* Image Upload Section */}
// //             <div className="editorImageUpload">
// //               <p>
// //                 <strong>Drag & drop files</strong> or{" "}
// //                 <span className="browse">Browse</span>
// //               </p>
// //               <p className="formats">Supported formats: JPEG, PNG</p>
// //             </div>

// //           </div>
// //           <div className="textEditorBtn">
// //             <button>Start Recording</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TextEditor;


// import React, { useRef, useState, useEffect } from "react";
// import "./textEditor.css";
// import PageImg from "../../../assest/Rectangle.png";
// import JoditEditor from "jodit-react";
// import axios from "axios";

// const TextEditor = () => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");
//   const [documentData, setDocumentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);
//   const [currentPdfIndex, setCurrentPdfIndex] = useState(0);

//   useEffect(() => {
//     fetchDocumentData();
//   }, []);

//   const fetchDocumentData = async () => {
//     const access_token = localStorage.getItem("access_token");
//     setLoading(true);
//     try {
//       const config = {
//         method: 'get',
//         url: 'http://51.20.246.38:5000/api/documentlist',
//         headers: { 
//           'Content-Type': 'application/json', 
//           'Authorization': `Bearer ${access_token}`,
//         }
//       };
      
//       const response = await axios.request(config);
//       setDocumentData(response.data);
//     } catch (error) {
//       console.error("Error fetching document data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get current document info
//   const currentDocument = documentData?.[0] || null;
//   const currentPdf = currentDocument?.pdf_info?.[currentPdfIndex] || null;
//   const currentPages = currentPdf?.pages_info || [];
//   const currentPage = currentPages[currentPageIndex] || null;

//   const documentName = currentPdf?.document_name || "Document.pdf";
//   const totalPages = currentDocument?.pages_assigned || 0;
//   const pendingPages = currentDocument?.pending_pages || 0;
//   const completedPages = totalPages - pendingPages;

//   const handlePreviousPage = () => {
//     if (currentPageIndex > 0) {
//       setCurrentPageIndex(currentPageIndex - 1);
//       setContent(""); // Reset content for new page
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPageIndex < currentPages.length - 1) {
//       setCurrentPageIndex(currentPageIndex + 1);
//       setContent(""); // Reset content for new page
//     }
//   };

//   const handleSave = () => {
//     // Implement save functionality here
//     console.log("Saving content for page:", currentPageIndex + 1);
//     console.log("Content:", content);
//   };

//   const handleDone = () => {
//     // Mark page as complete and move to next pending page
//     console.log("Marking page as complete:", currentPageIndex + 1);
//     handleNextPage();
//   };

//   return (
//     <div className="textEditorContainer">
//       <div className="textEditorTop">
//         <div className="textEditorTopLeft">
//           <i className="fa-solid fa-angle-left"></i>
//           <h3>{documentName}</h3>
//         </div>
//         <div className="editorTopRightBtn">
//           <button className="save" onClick={handleSave}>Save</button>
//           <button className="done" onClick={handleDone}>Done</button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading">Loading document data...</div>
//       ) : (
//         <>
//           <div className="textEditorMiddle">
//             <div className="textEditorleftImg">
//               <div className="middleLeft">
//                 <div className="textEditorLeftFilter">
//                   <h4>Filter</h4>
//                   <i className="fa-solid fa-filter"></i>
//                 </div>
//                 <div className="leftEditorTop">
//                   <div className="edtiorTotalPage">
//                     <h4>Total Page</h4>
//                     <h4>{totalPages}</h4>
//                   </div>
//                   <div className="editorPages">
//                     <h4>Pending Page</h4>
//                     <h4 className="front">{pendingPages}</h4>
//                   </div>
//                   <div className="editorPages">
//                     <h4>Completed Page</h4>
//                     <h4 className="front2">{completedPages}</h4>
//                   </div>
//                 </div>
//               </div>

//               <div className="middleRight">
//                 <div className="scrollWrapper">
//                   <div className="textEditorLeftPageListing">
//                     {currentPages.map((page, index) => (
//                       <div 
//                         key={index} 
//                         className={`imgListing ${currentPageIndex === index ? 'active' : ''}`}
//                         onClick={() => setCurrentPageIndex(index)}
//                       >
//                         <img 
//                           src={page.page_s3_url || PageImg} 
//                           alt={`Thumbnail for page ${index + 1}`}
//                           className="thumbnail"
//                         />
//                         <h4>Page {index + 1}</h4>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="image-and-textEditor">
//             <div className="textEditorImgMiddle">
//               <div className="middleTextEditorImg">
//                 {currentPage && (
//                   <img 
//                     src={currentPage.page_s3_url || PageImg} 
//                     alt={`Page ${currentPageIndex + 1}`}
//                     className="full-page-image"
//                   />
//                 )}
//               </div>
//               <div className="middleTextPageNO">
//                 <i 
//                   className="fa-solid fa-angle-left"
//                   onClick={handlePreviousPage}
//                   style={{ cursor: currentPageIndex > 0 ? 'pointer' : 'not-allowed' }}
//                 ></i>
//                 <h4>Page {currentPageIndex + 1}</h4>
//                 <i 
//                   className="fa-solid fa-angle-right"
//                   onClick={handleNextPage}
//                   style={{ cursor: currentPageIndex < currentPages.length - 1 ? 'pointer' : 'not-allowed' }}
//                 ></i>
//               </div>
//             </div>

//             <div className="textEditorContentRight">
//               <div className="editorContainer">
//                 <h4>Transcription</h4>

//                 <JoditEditor
//                   ref={editor}
//                   value={content}
//                   tabIndex={1}
//                   onBlur={(newContent) => setContent(newContent)}
//                   onChange={(newContent) => {}}
//                 />

//                 {/* Recording Section */}
//                 <div className="editorRecordingSection">
//                   {currentPage?.recording ? (
//                     <div className="recordingExists">
//                       <audio controls src={currentPage.recording}></audio>
//                     </div>
//                   ) : (
//                     <div className="editorImageUpload">
//                       <p>
//                         <strong>Drag & drop files</strong> or{" "}
//                         <span className="browse">Browse</span>
//                       </p>
//                       <p className="formats">Supported formats: JPEG, PNG</p>
//                     </div>
//                   )}
//                 </div>

//               </div>
//               <div className="textEditorBtn">
//                 <button>
//                   {currentPage?.recording ? "Re-record" : "Start Recording"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TextEditor;



// import React, { useRef, useState, useEffect } from "react";
// import "./textEditor.css";
// import PageImg from "../../../assest/Rectangle.png";
// import JoditEditor from "jodit-react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TextEditor = () => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");
//   const [documentData, setDocumentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);
//   const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
//   const navigate = useNavigate();
//   // Timer related states
//   const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
//   const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);

//   useEffect(() => {
//     fetchDocumentData();
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     // Start the timer
//     const timer = setInterval(() => {
//       setTimeRemaining(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setShowTimeoutPopup(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     // Cleanup on unmount
//     return () => clearInterval(timer);
//   }, []);

//   const formatTimeRemaining = () => {
//     const minutes = Math.floor(timeRemaining / 60);
//     const seconds = timeRemaining % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const fetchDocumentData = async () => {
//     const access_token = localStorage.getItem("access_token");
//     setLoading(true);
//     try {
//       const config = {
//         method: 'get',
//         url: 'http://51.20.246.38:5000/api/documentlist',
//         headers: { 
//           'Content-Type': 'application/json', 
//           'Authorization': `Bearer ${access_token}`,
//         }
//       };
      
//       const response = await axios.request(config);
//       setDocumentData(response.data);
//     } catch (error) {
//       console.error("Error fetching document data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get current document info
//   const currentDocument = documentData?.[0] || null;
//   const currentPdf = currentDocument?.pdf_info?.[currentPdfIndex] || null;
//   const currentPages = currentPdf?.pages_info || [];
//   const currentPage = currentPages[currentPageIndex] || null;

//   const documentName = currentPdf?.document_name || "Document.pdf";
//   const totalPages = currentDocument?.pages_assigned || 0;
//   const pendingPages = currentDocument?.pending_pages || 0;
//   const completedPages = totalPages - pendingPages;

//   const handlePreviousPage = () => {
//     if (currentPageIndex > 0) {
//       setCurrentPageIndex(currentPageIndex - 1);
//       setContent(""); // Reset content for new page
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPageIndex < currentPages.length - 1) {
//       setCurrentPageIndex(currentPageIndex + 1);
//       setContent(""); // Reset content for new page
//     }
//   };

//   const handleSave = () => {
//     // Implement save functionality here
//     console.log("Saving content for page:", currentPageIndex + 1);
//     console.log("Content:", content);
//     setShowTimeoutPopup(false); // Hide popup after saving
//     navigate('/my-dashboard')
//   };

//   const handleDone = () => {
//     // Mark page as complete and move to next pending page
//     console.log("Marking page as complete:", currentPageIndex + 1);
//     handleNextPage();
//     setShowTimeoutPopup(false); // Hide popup after done
//   };

//   return (
//     <div className="textEditorContainer">
//       <div className="textEditorTop">
//         <div className="textEditorTopLeft">
//           <i className="fa-solid fa-angle-left"></i>
//           <h3>{documentName}</h3>
//         </div>
//         <div className="editorTopRightBtn">
//           {/* Timer display */}
//           <div className="timer-display">
//             Time remaining: {formatTimeRemaining()}
//           </div>
//           <button className="save" onClick={handleSave}>Save</button>
//           <button className="done" onClick={handleDone}>Done</button>
          
//           {/* Timeout Popup */}
//           {showTimeoutPopup && (
//             <div className="timeout-popup">
//               <div className="timeout-popup-content">
//                 <h3>Time's Up!</h3>
//                 <p>Your 30-minute session has ended.</p>
//                 <div className="timeout-popup-buttons">
//                   <button onClick={handleSave}>Save</button>
//                   <button onClick={handleDone}>Done</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading">Loading document data...</div>
//       ) : (
//         <>
//           <div className="textEditorMiddle">
//             <div className="textEditorleftImg">
//               <div className="middleLeft">
//                 <div className="textEditorLeftFilter">
//                   <h4>Filter</h4>
//                   <i className="fa-solid fa-filter"></i>
//                 </div>
//                 <div className="leftEditorTop">
//                   <div className="edtiorTotalPage">
//                     <h4>Total Page</h4>
//                     <h4>{totalPages}</h4>
//                   </div>
//                   <div className="editorPages">
//                     <h4>Pending Page</h4>
//                     <h4 className="front">{pendingPages}</h4>
//                   </div>
//                   <div className="editorPages">
//                     <h4>Completed Page</h4>
//                     <h4 className="front2">{completedPages}</h4>
//                   </div>
//                 </div>
//               </div>

//               <div className="middleRight">
//                 <div className="scrollWrapper">
//                   <div className="textEditorLeftPageListing">
//                     {currentPages.map((page, index) => (
//                       <div 
//                         key={index} 
//                         className={`imgListing ${currentPageIndex === index ? 'active' : ''}`}
//                         onClick={() => setCurrentPageIndex(index)}
//                       >
//                         <img 
//                           src={page.page_s3_url || PageImg} 
//                           alt={`Thumbnail for page ${index + 1}`}
//                           className="thumbnail"
//                         />
//                         <h4>Page {index + 1}</h4>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="image-and-textEditor">
//             <div className="textEditorImgMiddle">
//               <div className="middleTextEditorImg">
//                 {currentPage && (
//                   <img 
//                     src={currentPage.page_s3_url || PageImg} 
//                     alt={`Page ${currentPageIndex + 1}`}
//                     className="full-page-image"
//                   />
//                 )}
//               </div>
//               <div className="middleTextPageNO">
//                 <i 
//                   className="fa-solid fa-angle-left"
//                   onClick={handlePreviousPage}
//                   style={{ cursor: currentPageIndex > 0 ? 'pointer' : 'not-allowed' }}
//                 ></i>
//                 <h4>Page {currentPageIndex + 1}</h4>
//                 <i 
//                   className="fa-solid fa-angle-right"
//                   onClick={handleNextPage}
//                   style={{ cursor: currentPageIndex < currentPages.length - 1 ? 'pointer' : 'not-allowed' }}
//                 ></i>
//               </div>
//             </div>

//             <div className="textEditorContentRight">
//               <div className="editorContainer">
//                 <h4>Transcription</h4>

//                 <JoditEditor
//                   ref={editor}
//                   value={content}
//                   tabIndex={1}
//                   onBlur={(newContent) => setContent(newContent)}
//                   onChange={(newContent) => {}}
//                 />

//                 {/* Recording Section */}
//                 <div className="editorRecordingSection">
//                   {currentPage?.recording ? (
//                     <div className="recordingExists">
//                       <audio controls src={currentPage.recording}></audio>
//                     </div>
//                   ) : (
//                     <div className="editorImageUpload">
//                       <p>
//                         <strong>Drag & drop files</strong> or{" "}
//                         <span className="browse">Browse</span>
//                       </p>
//                       <p className="formats">Supported formats: JPEG, PNG</p>
//                     </div>
//                   )}
//                 </div>

//               </div>
//               <div className="textEditorBtn">
//                 <button>
//                   {currentPage?.recording ? "Re-record" : "Start Recording"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TextEditor;


import React, { useRef, useState, useEffect } from "react";
import "./textEditor.css";
import PageImg from "../../../assest/Rectangle.png";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const navigate = useNavigate();
  
  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // Timer related states
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false);

  useEffect(() => {
    fetchDocumentData();
  }, []);

  // Timer effect
  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeoutPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  // Recording timer effect
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatRecordingTime = () => {
    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const fetchDocumentData = async () => {
    const access_token = localStorage.getItem("access_token");
    setLoading(true);
    try {
      const config = {
        method: 'get',
        url: 'http://51.20.246.38:5000/api/documentlist',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${access_token}`,
        }
      };
      
      const response = await axios.request(config);
      setDocumentData(response.data);
      
      // Load initial content if available
      if (response.data?.[0]?.pdf_info?.[0]?.pages_info?.[0]) {
        const initialPage = response.data[0].pdf_info[0].pages_info[0];
        if (initialPage.transcripted_html) {
          setHtmlContent(initialPage.transcripted_html);
          setContent(initialPage.transcripted_content || "");
        }
        if (initialPage.recording) {
          setAudioUrl(initialPage.recording);
        }
      }
    } catch (error) {
      console.error("Error fetching document data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get current document info
  const currentDocument = documentData?.[0] || null;
  const currentPdf = currentDocument?.pdf_info?.[currentPdfIndex] || null;
  const currentPages = currentPdf?.pages_info || [];
  const currentPage = currentPages[currentPageIndex] || null;

  const documentName = currentPdf?.document_name || "Document.pdf";
  const totalPages = currentDocument?.pages_assigned || 0;
  const pendingPages = currentDocument?.pending_pages || 0;
  const completedPages = totalPages - pendingPages;

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      savePage().then(() => {
        setCurrentPageIndex(currentPageIndex - 1);
        
        // Load content for the previous page
        const prevPage = currentPages[currentPageIndex - 1];
        if (prevPage) {
          setHtmlContent(prevPage.transcripted_html || "");
          setContent(prevPage.transcripted_content || "");
          setAudioUrl(prevPage.recording || null);
          setAudioBlob(null);
          setRecordingTime(0);
        }
      });
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < currentPages.length - 1) {
      savePage().then(() => {
        setCurrentPageIndex(currentPageIndex + 1);
        
        // Load content for the next page
        const nextPage = currentPages[currentPageIndex + 1];
        if (nextPage) {
          setHtmlContent(nextPage.transcripted_html || "");
          setContent(nextPage.transcripted_content || "");
          setAudioUrl(nextPage.recording || null);
          setAudioBlob(null);
          setRecordingTime(0);
        }
      });
    }
  };

  const savePage = async () => {
    if (!currentPage || !currentPage.id) return Promise.resolve();
    
    setSaving(true);
    const access_token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    
    try {
      const formData = new FormData();
      formData.append('id', currentPage.id);
      formData.append('assigned_to', user_id || '');
      formData.append('transcripted_time', recordingTime.toString());
      formData.append('transcripted_html', htmlContent);
      
      // Append file if available
      if (selectedFile) {
        formData.append('transcripted_content', selectedFile);
      }
      
      // Append audio blob if available
      if (audioBlob) {
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        formData.append('recording', audioFile);
      }
      
      formData.append('save_date', new Date().toISOString());
      
      const config = {
        method: 'post',
        url: 'http://51.20.246.38:5000/api/update_transcript',
        headers: { 
          'Authorization': `Bearer ${access_token}`,
          // No need to set Content-Type as FormData will set it with boundary
        },
        data: formData
      };
      
      const response = await axios.request(config);
      console.log("Save response:", response.data);
      return response;
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page. Please try again.");
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      await savePage();
      alert("Page saved successfully!");
      setShowTimeoutPopup(false); // Hide popup after saving
      navigate('/my-dashboard');
    } catch (error) {
      // Error handling done in savePage
    }
  };

  const handleDone = async () => {
    try {
      await savePage();
      // Mark page as complete and move to next pending page
      console.log("Marking page as complete:", currentPageIndex + 1);
      
      // If this was the last page, go back to dashboard
      if (currentPageIndex === currentPages.length - 1) {
        navigate('/my-dashboard');
      } else {
        handleNextPage();
      }
      
      setShowTimeoutPopup(false); // Hide popup after done
    } catch (error) {
      // Error handling done in savePage
    }
  };

  // File upload handlers
  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Preview file if it's an image
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // You could set an image preview state here if needed
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.includes('image')) {
        setSelectedFile(file);
      } else {
        alert("Please upload only image files (JPEG, PNG)");
      }
    }
  };

  // Recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
      });
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Cannot access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="textEditorContainer">
      <div className="textEditorTop">
        <div className="textEditorTopLeft">
          <i className="fa-solid fa-angle-left" onClick={() => navigate('/my-dashboard')}></i>
          <h3>{documentName}</h3>
        </div>
        <div className="editorTopRightBtn">
          {/* Timer display */}
          <div className="timer-display">
            Time remaining: {formatTimeRemaining()}
          </div>
          <button className="save" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button className="done" onClick={handleDone} disabled={saving}>Done</button>
          
          {/* Timeout Popup */}
          {showTimeoutPopup && (
            <div className="timeout-popup">
              <div className="timeout-popup-content">
                <h3>Time's Up!</h3>
                <p>Your 30-minute session has ended.</p>
                <div className="timeout-popup-buttons">
                  <button onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={handleDone} disabled={saving}>Done</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading document data...</div>
      ) : (
        <>
          <div className="textEditorMiddle">
            <div className="textEditorleftImg">
              <div className="middleLeft">
                <div className="textEditorLeftFilter">
                  <h4>Filter</h4>
                  <i className="fa-solid fa-filter"></i>
                </div>
                <div className="leftEditorTop">
                  <div className="edtiorTotalPage">
                    <h4>Total Page</h4>
                    <h4>{totalPages}</h4>
                  </div>
                  <div className="editorPages">
                    <h4>Pending Page</h4>
                    <h4 className="front">{pendingPages}</h4>
                  </div>
                  <div className="editorPages">
                    <h4>Completed Page</h4>
                    <h4 className="front2">{completedPages}</h4>
                  </div>
                </div>
              </div>

              <div className="middleRight">
                <div className="scrollWrapper">
                  <div className="textEditorLeftPageListing">
                    {currentPages.map((page, index) => (
                      <div 
                        key={index} 
                        className={`imgListing ${currentPageIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentPageIndex(index)}
                      >
                        <img 
                          src={page.page_s3_url || PageImg} 
                          alt={`Thumbnail for page ${index + 1}`}
                          className="thumbnail"
                        />
                        <h4>Page {index + 1}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="image-and-textEditor">
            <div className="textEditorImgMiddle">
              <div className="middleTextEditorImg">
                {currentPage && (
                  <img 
                    src={currentPage.page_s3_url || PageImg} 
                    alt={`Page ${currentPageIndex + 1}`}
                    className="full-page-image"
                  />
                )}
              </div>
              <div className="middleTextPageNO">
                <i 
                  className="fa-solid fa-angle-left"
                  onClick={handlePreviousPage}
                  style={{ cursor: currentPageIndex > 0 ? 'pointer' : 'not-allowed' }}
                ></i>
                <h4>Page {currentPageIndex + 1}</h4>
                <i 
                  className="fa-solid fa-angle-right"
                  onClick={handleNextPage}
                  style={{ cursor: currentPageIndex < currentPages.length - 1 ? 'pointer' : 'not-allowed' }}
                ></i>
              </div>
            </div>

            <div className="textEditorContentRight">
              <div className="editorContainer">
                <h4>Transcription</h4>

                <JoditEditor
                  ref={editor}
                  value={htmlContent}
                  tabIndex={1}
                  onBlur={(newContent) => setHtmlContent(newContent)}
                  onChange={(newContent) => {}}
                />

                {/* Recording Section */}
                <div className="editorRecordingSection">
                  {isRecording ? (
                    <div className="recording-active">
                      <div className="recording-indicator">
                        <span className="recording-dot"></span>
                        Recording... {formatRecordingTime()}
                      </div>
                    </div>
                  ) : audioUrl ? (
                    <div className="recordingExists">
                      <audio controls src={audioUrl}></audio>
                    </div>
                  ) : (
                    <div 
                      className="editorImageUpload"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/jpeg,image/png"
                        onChange={handleFileSelect}
                      />
                      <p>
                        <strong>Drag & drop files</strong> or{" "}
                        <span className="browse">Browse</span>
                      </p>
                      <p className="formats">Supported formats: JPEG, PNG</p>
                      {selectedFile && (
                        <p className="selected-file">Selected: {selectedFile.name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="textEditorBtn">
                <button 
                  className={isRecording ? "recording-btn" : ""}
                  onClick={toggleRecording}
                >
                  {isRecording ? "Stop Recording" : (audioUrl ? "Re-record" : "Start Recording")}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;