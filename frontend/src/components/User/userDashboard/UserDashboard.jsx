// import React, { useState, useEffect } from "react";
// import "./userDash.css";
// import completePage from "../../../assest/completedpage.png";
// import assignedPage from "../../../assest/assignedpage.png";
// import timeTaken from "../../../assest/timetaken.png";
// import PngLogo from "../../../assest/pnglogo.png";
// import completeImg from "../../../assest/comimg.png";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const UserDashboard = () => {
//   const percentage = 66;

//   const [openIndex, setOpenIndex] = useState(null);
//   const [userStats, setUserStats] = useState({});
//   const [pdfList, setPdfList] = useState([]);
//   const [leaderboard, setLeaderboard] = useState([]);
  

//   const toggleDetails = (index) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       const access_token = localStorage.getItem("access_token");
//       try {
//         const [statsRes, pdfRes, leaderboardRes] = await Promise.all([
//           fetch("http://51.20.246.38:5000/api/userdashboard", {
//             method: "GET",
//            // mode: 'no-cors',
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${access_token}`,
//             },
//           }),
//           fetch('http://51.20.246.38:5000/api/documentlist',{
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${access_token}`
//             }
//           }),
//           fetch("http://51.20.246.38:5000/api/top_users", {
//             method: "GET",
//           //  mode: 'no-cors',
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${access_token}`,
//             },
//           }),
//         ]);
  
//         const [stats,pdf, leaderboard] = await Promise.all([
//           statsRes.json(),
//           pdfRes.json(),
//           leaderboardRes.json(),
//         ]);
  
//         setUserStats(stats);
//         setPdfList(pdf);
//         setLeaderboard(leaderboard);
//       } catch (err) {
//         console.error("Dashboard data fetch failed", err);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   const data = [
//     { day: "Mon", value: 5 },
//     { day: "Tues", value: 10 },
//     { day: "Wed", value: 7 },
//     { day: "Thurs", value: 12 },
//     { day: "Fri", value: 8 },
//     { day: "Sat", value: 15 },
//     { day: "Sun", value: 10 },
//   ];

//   return (
//     <div>
//       <div className="userDashboard">
//         <div className="topUserCards">
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Pages Completed</h3>
//               <h1>{userStats.pages_completed}</h1>
//             </div>

//             <div className="adminDetailsRight">
//               <img src={completePage} alt="" />
//             </div>
//           </div>
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Pages Assigned</h3>
//               <h1>{userStats.total_pages}</h1>
//             </div>

//             <div className="adminDetailsRight">
//               <img src={assignedPage} alt="" />
//             </div>
//           </div>
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Pages Left</h3>
//               <h1>{userStats.pages_left}</h1>
//             </div>

//             <div className="adminDetailsRight">
//               <img src={assignedPage} alt="" />
//             </div>
//           </div>
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Time Taken</h3>
//               <h1>{userStats.total_transcription_time}</h1>
//             </div>

//             <div className="adminDetailsRight">
//               <img src={timeTaken} alt="" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="userDashBottom">
//         <div className="recentPdfListing">
//           <div className="recentPdfHeading">
//             <div className="pdfHeadingText">
//               <h1>{`RECENT PDF LISTING(${pdfList[0]?.pdf_info.length})`}</h1>
//             </div>
//             <div className="pdfHeadingBtn">
//               <button>View All</button>
//             </div>
//           </div>

//           <div>
//             {Array.isArray(pdfList[0]?.pdf_info) && pdfList[0]?.pdf_info?.map((pdf, index) => (
              
//               <div className="pdfListingMain" key={index}>
//                 <div
//                   className="pdfListingCard"
//                   onClick={() => toggleDetails(index)}
//                 >
//                   <div className="pdfListingLeftarrow">
//                     <i
//                       className={`fa-solid ${
//                         openIndex === index ? "fa-angle-up" : "fa-angle-down"
//                       }`}
//                     ></i>
//                   </div>
//                   <div className="pdfLogo">
//                     <img src={PngLogo} alt="" />
//                   </div>
//                   <div className="pdfClientProposal">
//                     <div className="clientProposalHeading">
//                       <h1>{pdf.document_name}</h1>
//                     </div>
//                     <div className="pdfListingPages">
//                       <div className="pdfPageCount">
//                         <h4>{`${pdf.pages_info?.length} pages assigned`}</h4>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="userDashProgessBar">
//                     <CircularProgressbar
//                       value={(pdf.pages_completed/ pdf.pages_left)/100}
//                       text={`${(pdf.pages_completed/ pdf.pages_left)/100}%`}
//                     />
//                   </div>
//                 </div>

//                 {openIndex === index && (
//                   <div className="userpdfListCompleteDetails">
//                     {[...Array(2)].map((_, i) => (
//                       <div className="userPdfupperPages" key={i}>
//                         <div className="upperPagesLeft">
//                           <div className="numberpageComplete">
//                             <h3>{i === 0 ? pdf?.pages_info?.filter(page => page.page_s3_url !== null).length : pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length}</h3>
//                           </div>
//                           <div className="pagesCompletedText">
//                             <h3>{i === 0 ? 'Completed Pages' : 'Pending Pages'}</h3>
//                           </div>
//                         </div>
//                         <div className="pagesCompletedImage">
//                           {i === 0 ? pdf?.pages_info?.map((_, j) => (
//                             <div className="comImg" key={j}>
//                               <img src={_.page_s3_url} alt="" />
//                             </div>
//                           )) : pdf?.pages_info?.map((_, j) => (
//                             <div className="comImg" key={j}>
//                               <img src={_.transcripted_pdf_s3} alt="" />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="leaderBoard-and-graph">
//           <div className="userDashLeaderBoard">
//             <div className="adminTopRight">
//               <div className="leaderBoard">
//                 <div className="leaderBoardHeading">
//                   <h3>LEADERBOARD</h3>
//                 </div>

//                 <div className="leaderBoardHeading">
//                   <button>View All</button>
//                 </div>
//               </div>

//               <div className="adminLeaderTable">
//                 <table class="table custom-table">
//                   <thead>
//                     <tr>
//                       <th scope="col">Rank</th>
//                       <th scope="col">Name</th>
//                       <th scope="col">Pdf Complete</th>
//                       <th scope="col">Spend Time</th>
//                       <th scope="col">Pages Completed</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {leaderboard.map((user, index) => (
//                       <tr key={index}>
//                         <th scope="row">{user.rank}</th>
//                         <td>{user.username}</td>
//                         <td>{user.total_pages - user.pending_pages}</td>
//                         <td>{user.total_time}</td>
//                         <td>{user.completed_pages}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           <div className="userDashAvgTimeGraph">
//             <div className="graphHeading">
//               <h4>Average Time/Page</h4>
//               <h1>4 hour</h1>
//             </div>

//             <div className="graph">
//               <div style={{ width: "100%", height: 300 }}>
//                 <ResponsiveContainer>
//                   <LineChart data={data}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="day" />
//                     <YAxis ticks={[0, 5, 10, 15, 20]} domain={[0, 20]} />
//                     <Tooltip />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke="#00c49f"
//                       strokeWidth={2}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


// import React, { useState, useEffect } from "react";
// import "./dashboard.css";
// import completePage from "../../../assest/completedpage.png";
// import assignedPage from "../../../assest/assignedpage.png";
// import timeTaken from "../../../assest/timetaken.png";
// import PngLogo from "../../../assest/pnglogo.png";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const UserDashboard = () => {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [userStats, setUserStats] = useState({
//     pages_completed: 0,
//     total_pages: 0,
//     pages_left: 0,
//     total_transcription_time: "0h 0m"
//   });
//   const [pdfList, setPdfList] = useState([{ pdf_info: [] }]);
//   const [leaderboard, setLeaderboard] = useState([]);
  

//   const toggleDetails = (index) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       const access_token = localStorage.getItem("access_token");
      
//       try {
//         // पहला API कॉल
//         const statsRes = await fetch("http://51.20.246.38:5000/api/userdashboard", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         const stats = await statsRes.json();
//         setUserStats(stats);
        
//         // दूसरा API कॉल
//         const pdfRes = await fetch('http://51.20.246.38:5000/api/documentlist', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${access_token}`
//           }
//         });
//         const pdf = await pdfRes.json();
//         setPdfList(pdf);
        
//         // तीसरा API कॉल
//         const leaderboardRes = await fetch("http://51.20.246.38:5000/api/top_users", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         const leaderboardData = await leaderboardRes.json();
//         setLeaderboard(leaderboardData);
        
//       } catch (err) {
//         console.error("Dashboard data fetch failed", err);
//       }
//     };
    
//     fetchDashboardData();
//   }, []);

//   // useEffect(() => {
    
//   //   // localStorage.removeItem('user_id');
//   //   // localStorage.removeItem('username');
//   //   // localStorage.removeItem('role');
//   //   // localStorage.removeItem('access_token');
//   //       const fetchDashboardData = async () => {
//   //         const access_token = localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0NDU2NTg4MiwianRpIjoiZWE2Y2UwZDAtZTc1Yy00Mzc5LWI1MjYtNWFjMDk0YWI3ZGNlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjQ3MyIsIm5iZiI6MTc0NDU2NTg4MiwiY3NyZiI6ImU2OTQ5YmFjLTQyMWEtNDJiNy04MDc0LTk2OWNlNDdmZDAxYSIsImV4cCI6MTc0NDU4MDI4Mn0.A25hOJdhm5eh_E-VkSSdwWFuve8zi1id_yNBalBNUHE");
//   //         try {
//   //           const [statsRes, pdfRes, leaderboardRes] = await Promise.all([
//   //             fetch("http://51.20.246.38:5000/api/userdashboard", {
//   //               method: "GET",
//   //              // mode: 'no-cors',
//   //               headers: {
//   //                 "Content-Type": "application/json",
//   //                 Authorization: `Bearer ${access_token}`,
//   //               },
//   //             }),
//   //             fetch('http://51.20.246.38:5000/api/documentlist',{
//   //               method: 'GET',
//   //               headers: {
//   //                 'Content-Type': 'application/json',
//   //                 'Authorization': `Bearer ${access_token}`
//   //               }
//   //             }),
//   //             fetch("http://51.20.246.38:5000/api/top_users", {
//   //               method: "GET",
//   //             //  mode: 'no-cors',
//   //               headers: {
//   //                 "Content-Type": "application/json",
//   //                 Authorization: `Bearer ${access_token}`,
//   //               },
//   //             }),
//   //           ]);
      
//   //           const [stats,pdf, leaderboard] = await Promise.all([
//   //             statsRes.json(),
//   //             pdfRes.json(),
//   //             leaderboardRes.json(),
//   //           ]);
//   //     console.log("this is a leaderboard dta....",leaderboard);
      
//   //           setUserStats(stats);
//   //           setPdfList(pdf);
//   //           setLeaderboard(leaderboard);
//   //         } catch (err) {
//   //           console.error("Dashboard data fetch failed", err);
//   //         }
//   //       };
//   //       fetchDashboardData();
//   //     }, []);
    
//   // useEffect(() => {
//   //   const fetchDashboardData = async () => {
//   //     const access_token = localStorage.getItem("access_token");
//   //     try {
//   //       const [statsRes, pdfRes, leaderboardRes] = await Promise.all([
//   //         fetch("http://51.20.246.38:5000/api/userdashboard", {
//   //           method: "GET",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             Authorization: `Bearer ${access_token}`,
//   //           },
//   //         }),
//   //         fetch('http://51.20.246.38:5000/api/documentlist',{
//   //           method: 'GET',
//   //           headers: {
//   //             'Content-Type': 'application/json',
//   //             'Authorization': `Bearer ${access_token}`
//   //           }
//   //         }),
//   //         fetch("http://51.20.246.38:5000/api/top_users", {
//   //           method: "GET",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             Authorization: `Bearer ${access_token}`,
//   //           },
//   //         }),
//   //       ]);
  
//   //       const [stats, pdf, leaderboardData] = await Promise.all([
//   //         statsRes.json(),
//   //         pdfRes.json(),
//   //         leaderboardRes.json(),
//   //       ]);
  
//   //       setUserStats(stats);
//   //       setPdfList(pdf);
//   //       setLeaderboard(leaderboardData);
//   //     } catch (err) {
//   //       console.error("Dashboard data fetch failed", err);
//   //     }
//   //   };
   
    
//   //   fetchDashboardData();
//   // }, []);

//   const data = [
//     { day: "Mon", value: 5 },
//     { day: "Tue", value: 10 },
//     { day: "Wed", value: 7 },
//     { day: "Thu", value: 12 },
//     { day: "Fri", value: 8 },
//     { day: "Sat", value: 15 },
//     { day: "Sun", value: 10 },
//   ];

//   // Calculate completion percentage properly
//   const calculatePercentage = (completed, total) => {
//     if (!total) return 0;
//     return Math.round((completed / total) * 100);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="userDashboard">
//         <div className="topUserCards">
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Pages Completed</h3>
//               <h1>{userStats.pages_completed || 0}</h1>
//             </div>
//             <div className="adminDetailsRight">
//               <img src={completePage} alt="Completed pages icon" />
//             </div>
//           </div>
          
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Pages Assigned</h3>
//               <h1>{userStats.total_pages || 0}</h1>
//             </div>
//             <div className="adminDetailsRight">
//               <img src={assignedPage} alt="Assigned pages icon" />
//             </div>
//           </div>
          
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Pages Left</h3>
//               <h1>{userStats.pages_left || 0}</h1>
//             </div>
//             <div className="adminDetailsRight">
//               <img src={assignedPage} alt="Pages left icon" />
//             </div>
//           </div>
          
//           <div className="userDetailsTopCard">
//             <div className="adminDetailsLeft">
//               <h3>Total Time Taken</h3>
//               <h1>{userStats.total_transcription_time || "0h 0m"}</h1>
//             </div>
//             <div className="adminDetailsRight">
//               <img src={timeTaken} alt="Time taken icon" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="userDashBottom">
//         <div className="recentPdfListing">
//           <div className="recentPdfHeading">
//             <div className="pdfHeadingText">
//               <h1>{`RECENT PDF LISTINGS (${pdfList[0]?.pdf_info?.length || 0})`}</h1>
//             </div>
//             <div className="pdfHeadingBtn">
//               <button>View All</button>
//             </div>
//           </div>

//           <div className="pdf-listing-container">
//             {Array.isArray(pdfList[0]?.pdf_info) && pdfList[0]?.pdf_info.map((pdf, index) => (
//               <div className="pdfListingMain" key={index}>
//                 <div
//                   className="pdfListingCard"
//                   onClick={() => toggleDetails(index)}
//                 >
//                   <div className="pdfListingLeftarrow">
//                     <i
//                       className={`fa-solid ${
//                         openIndex === index ? "fa-angle-up" : "fa-angle-down"
//                       }`}
//                     ></i>
//                   </div>
                  
//                   <div className="pdfLogo123">
//                     <img src={PngLogo} alt="PDF icon" />
//                   </div>
                  
//                   <div className="pdfClientProposal">
//                     <div className="clientProposalHeading">
//                       <h1>{pdf.document_name}</h1>
//                     </div>
//                     <div className="pdfListingPages">
//                       <div className="pdfPageCount">
//                         <h4>{`${pdf.pages_info?.length || 0} pages assigned`}</h4>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="userDashProgessBar">
//                     <CircularProgressbar
//                       value={calculatePercentage(pdf.pages_completed, pdf.pages_info?.length)}
//                       text={`${calculatePercentage(pdf.pages_completed, pdf.pages_info?.length)}%`}
//                     />
//                   </div>
//                 </div>

//                 {openIndex === index && (
//                   <div className="userpdfListCompleteDetails">
//                     <div className="userPdfupperPages">
//                       <div className="upperPagesLeft">
//                         <div className="numberpageComplete">
//                           <h3>{pdf?.pages_info?.filter(page => page.page_s3_url !== null).length || 0}</h3>
//                         </div>
//                         <div className="pagesCompletedText">
//                           <h3>Completed Pages</h3>
//                         </div>
//                       </div>
//                       <div className="pagesCompletedImage">
//                         {pdf?.pages_info?.filter(page => page.page_s3_url !== null).slice(0, 3).map((page, j) => (
//                           <div className="comImg" key={j}>
//                             <img src={page.page_s3_url} alt="Page thumbnail" />
//                           </div>
//                         ))}
//                         {pdf?.pages_info?.filter(page => page.page_s3_url !== null).length > 3 && (
//                           <div className="more-pages">+{pdf?.pages_info?.filter(page => page.page_s3_url !== null).length - 3}</div>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="userPdfupperPages">
//                       <div className="upperPagesLeft">
//                         <div className="numberpageComplete">
//                           <h3>{pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length || 0}</h3>
//                         </div>
//                         <div className="pagesCompletedText">
//                           <h3>Pending Pages</h3>
//                         </div>
//                       </div>
//                       <div className="pagesCompletedImage">
//                         {pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).slice(0, 3).map((page, j) => (
//                           <div className="comImg" key={j}>
//                             <img src={page.transcripted_pdf_s3} alt="Page thumbnail" />
//                           </div>
//                         ))}
//                         {pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length > 3 && (
//                           <div className="more-pages">+{pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length - 3}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <div className="leaderBoard-and-graph">
//           <div className="userDashLeaderBoard">
//             <div className="adminTopRight">
//               <div className="leaderBoard">
//                 <div className="leaderBoardHeading">
//                   <h3>LEADERBOARD</h3>
//                 </div>
//                 <div className="leaderBoardHeading">
//                   <button>View All</button>
//                 </div>
//               </div>

//               <div className="adminLeaderTable">
//                 <div className="table-responsive">
//                   <table className="table custom-table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Rank</th>
//                         <th scope="col">Name</th>
//                         <th scope="col">PDF Complete</th>
//                         <th scope="col">Spent Time</th>
//                         <th scope="col">Pages Completed</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {leaderboard.map((user, index) => (
//                         <tr key={index} className={user.username === "You" ? "current-user" : ""}>
//                           <th scope="row">{user.rank}</th>
//                           <td>{user.username}</td>
//                           <td>{user.total_pages - user.pending_pages}</td>
//                           <td>{user.total_time}</td>
//                           <td>{user.completed_pages}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="userDashAvgTimeGraph">
//             <div className="graphHeading">
//               <h4>Average Time/Page</h4>
//               <h1>4 hour</h1>
//               <span className="trend-indicator">+12.25%</span>
//             </div>

//             <div className="graph">
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis ticks={[0, 5, 10, 15, 20]} domain={[0, 20]} />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#00c49f"
//                     strokeWidth={2}
//                     activeDot={{ r: 8 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from "react";
import "./dashboard.css";
import completePage from "../../../assest/completedpage.png";
import assignedPage from "../../../assest/assignedpage.png";
import timeTaken from "../../../assest/timetaken.png";
import PngLogo from "../../../assest/pnglogo.png";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link,useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [userStats, setUserStats] = useState({
    pages_completed: 0,
    total_pages: 0,
    pages_left: 0,
    total_transcription_time: "0h 0m"
  });
  const navigate = useNavigate() 
  const [pdfList, setPdfList] = useState([{ pdf_info: [] }]);
  const [leaderboard, setLeaderboard] = useState([]);
  
  const toggleDetails = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleTextEditor = () => {
    navigate('/text-editor')
  }

  const handlePdfcheck = () => {
    navigate('/pdf-check')
  }
  useEffect(() => {
    //     localStorage.removeItem('user_id');
    // localStorage.removeItem('username');
    // localStorage.removeItem('role');
    // localStorage.removeItem('access_token');
    const fetchDashboardData = async () => {
      const access_token = localStorage.getItem("access_token");
      
      try {
        // First API call
        const statsRes = await fetch("http://51.20.246.38:5000/api/userdashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        const stats = await statsRes.json();
        setUserStats(stats);
        
        // Second API call
        const pdfRes = await fetch('http://51.20.246.38:5000/api/documentlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          }
        });
        const pdf = await pdfRes.json();
        setPdfList(pdf);
        
        // Third API call
        const leaderboardRes = await fetch("http://51.20.246.38:5000/api/top_users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        const leaderboardData = await leaderboardRes.json();
        setLeaderboard(leaderboardData);
        
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      }
    };
    
    fetchDashboardData();
  }, []);

  const data = [
    { day: "Mon", value: 5 },
    { day: "Tue", value: 10 },
    { day: "Wed", value: 7 },
    { day: "Thu", value: 12 },
    { day: "Fri", value: 8 },
    { day: "Sat", value: 15 },
    { day: "Sun", value: 10 },
  ];

  // Calculate completion percentage properly
  const calculatePercentage = (completed, total) => {
    if (!total) return 0;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="dashboard-wrapper h-100 overflow-hidden d-flex flex-column">
      <div className="userDashboard mb-1">
        <div className="row gx-3">
          <div className="col-md-3">
            <div className="userDetailsTopCard d-flex p-3 h-100 bg-white rounded shadow-sm">
              <div className="adminDetailsLeft">
                <h6 className="text-muted mb-1">Total Pages Completed</h6>
                <h3>{userStats.pages_completed || 0}</h3>
              </div>
              <div className="adminDetailsRight ms-auto">
                <img src={completePage} alt="Completed pages icon" className="img-fluid" style={{width: "48px"}} />
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="userDetailsTopCard d-flex p-3 h-100 bg-white rounded shadow-sm">
              <div className="adminDetailsLeft">
                <h6 className="text-muted mb-1">Total Pages Assigned</h6>
                <h3>{userStats.total_pages || 0}</h3>
              </div>
              <div className="adminDetailsRight ms-auto">
                <img src={assignedPage} alt="Assigned pages icon" className="img-fluid" style={{width: "48px"}} />
              </div> 
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="userDetailsTopCard d-flex p-3 h-100 bg-white rounded shadow-sm">
              <div className="adminDetailsLeft">
                <h6 className="text-muted mb-1">Total Pages Left</h6>
                <h3>{userStats.pages_left || 0}</h3>
              </div>
              <div className="adminDetailsRight ms-auto">
                <img src={assignedPage} alt="Pages left icon" className="img-fluid" style={{width: "48px"}} />
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="userDetailsTopCard d-flex p-3 h-100 bg-white rounded shadow-sm">
              <div className="adminDetailsLeft">
                <h6 className="text-muted mb-1">Total Time Taken</h6>
                <h3>{userStats.total_transcription_time || "0h 0m"}</h3>
              </div>
              <div className="adminDetailsRight ms-auto">
                <img src={timeTaken} alt="Time taken icon" className="img-fluid" style={{width: "48px"}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="userDashBottom flex-grow-1 overflow-hidden">
        <div className="row h-100">
          <div className="col-md-4 d-flex flex-column h-100">
            <div className="recentPdfListing bg-white rounded shadow-sm d-flex flex-column h-100">
              <div className="recentPdfHeading d-flex justify-content-between align-items-center p-3 border-bottom">
                <div className="pdfHeadingText">
                  <h5 className="mb-0">{`RECENT PDF LISTINGS (${pdfList[0]?.pdf_info?.length || 0})`}</h5>
                </div>
                <div className="pdfHeadingBtn">
                  <button className="btn btn-sm btn-primary"  onClick={handlePdfcheck}>View All</button>
                </div>
              </div>

              <div className="pdf-listing-container overflow-auto flex-grow-1 p-2">
                {Array.isArray(pdfList[0]?.pdf_info) && pdfList[0]?.pdf_info.map((pdf, index) => (
                  <div className="pdfListingMain mb-2" key={index}>
                    <div
                      className="pdfListingCard d-flex align-items-center p-2 bg-light rounded cursor-pointer"
                      onClick={() => toggleDetails(index)}
                    >
                      <div className="pdfListingLeftarrow me-2">
                        <i
                          className={`fa-solid ${
                            openIndex === index ? "fa-angle-up" : "fa-angle-down"
                          }`}
                        ></i>
                      </div>
                      
                      <div className="pdfLogo123 me-3">
                        <img src={PngLogo} alt="PDF icon" style={{width: "32px"}} />
                      </div>
                      
                      <div className="pdfClientProposal flex-grow-1">
                        <div className="clientProposalHeading">
                          <h6 className="mb-0">{pdf.document_name}</h6>
                        </div>
                        <div className="pdfListingPages">
                          <div className="pdfPageCount">
                            <small className="text-muted">{`${pdf.pages_info?.length || 0} pages assigned`}</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="userDashProgessBar" style={{width: "40px", height: "40px"}}>
                        <CircularProgressbar
                          value={calculatePercentage(pdf.pages_completed, pdf.pages_info?.length)}
                          text={`${calculatePercentage(pdf.pages_completed, pdf.pages_info?.length)}%`}
                        />
                      </div>
                    </div>

                    {openIndex === index && (
                      <div className="userpdfListCompleteDetails p-3 border rounded-bottom mb-3">
                        <div className="row mb-3">
                          <div className="col-md-4 d-flex align-items-center">
                            <div className="numberpageComplete me-2">
                              <h5 className="mb-0">{pdf?.pages_info?.filter(page => page.page_s3_url !== null).length || 0}</h5>
                            </div>
                            <div className="pagesCompletedText">
                              <small className="text-muted">Completed Pages</small>
                            </div>
                          </div>
                          <div className="col-md-8 pagesCompletedImage d-flex">
                            {pdf?.pages_info?.filter(page => page.page_s3_url !== null).slice(0, 3).map((page, j) => (
                              <div className="comImg me-2" key={j} style={{width: "40px", height: "40px"}}>
                                <img src={page.page_s3_url} alt="Page thumbnail" className="img-fluid rounded" />
                              </div>
                            ))}
                            {pdf?.pages_info?.filter(page => page.page_s3_url !== null).length > 3 && (
                              <div className="more-pages badge bg-secondary d-flex align-items-center justify-content-center">
                                +{pdf?.pages_info?.filter(page => page.page_s3_url !== null).length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center">
                            <div className="numberpageComplete me-2">
                              <h5 className="mb-0">{pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length || 0}</h5>
                            </div>
                            <div className="pagesCompletedText">
                              <small className="text-muted">Pending Pages</small>
                            </div>
                          </div>
                          <div className="col-md-8 pagesCompletedImage d-flex">
                            {pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).slice(0, 3).map((page, j) => (
                              <div className="comImg me-2" key={j} style={{width: "40px", height: "40px"}}>
                                <img src={page.transcripted_pdf_s3} alt="Page thumbnail" className="img-fluid rounded" />
                              </div>
                            ))}
                            {pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length > 3 && (
                              <div className="more-pages badge bg-secondary d-flex align-items-center justify-content-center">
                                +{pdf?.pages_info?.filter(page => page.transcripted_pdf_s3 !== null).length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-8 d-flex flex-column h-100">
            <div className="userDashLeaderBoard bg-white rounded shadow-sm mb-3 d-flex flex-column" style={{height: "60%"}}>
              <div className="leaderBoard d-flex justify-content-between align-items-center p-3 border-bottom">
                <div className="leaderBoardHeading">
                  <h5 className="mb-0">LEADERBOARD</h5>
                </div>
                <div className="leaderBoardHeading">
                  <button className="btn btn-sm btn-primary" onClick={handleTextEditor}>View All</button>
                </div>
              </div>

              <div className="adminLeaderTable flex-grow-1">
                <div className="table-responsive h-100">
                  <table className="table table-sm table-hover  mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">PDF</th>
                        <th scope="col">Time</th>
                        <th scope="col">Pages</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((user, index) => (
                        <tr key={index} className={user.username === "You" ? "table-primary" : ""}>
                          <th scope="row">{user.rank}</th>
                          <td>{user.username}</td>
                          <td>{user.total_pages - user.pending_pages}</td>
                          <td>{user.total_time}</td>
                          <td>{user.completed_pages}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="userDashAvgTimeGraph bg-white rounded shadow-sm p-3 d-flex flex-column" style={{height: "40%"}}>
              <div className="graphHeading mb-2">
                <h6 className="text-muted mb-0">Average Time/Page</h6>
                <div className="d-flex align-items-center">
                  <h4 className="mb-0 me-2">4 hour</h4>
                  <span className="badge bg-success">+12.25%</span>
                </div>
              </div>

              <div className="graph flex-grow-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis ticks={[0, 5, 10, 15, 20]} domain={[0, 20]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00c49f"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;