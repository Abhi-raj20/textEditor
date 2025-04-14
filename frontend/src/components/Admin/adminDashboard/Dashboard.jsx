import React, { useEffect, useState } from "react";
import "./adminDash.css";
import PeopleGroup from "../../../assest/group.png";
import assignedPage from "../../../assest/assignedpage.png";
import completePage from "../../../assest/completedpage.png";
import timeTaken from "../../../assest/timetaken.png";
import totalRecording from "../../../assest/totalrecording.png";
import pendingPage from "../../../assest/pendingpage.png";
import CreateUserModal from "../../modal/createUserModal/CreateUserModal";

const Dashboard = () => {
  // Data Binding ========================================

  const [adminStat, setAdminStat] = useState({});
  const [userStat, setUserStat] = useState([]);
  const [userList, setUserList] = useState([]);

  console.log(adminStat);
  console.log(userStat);
  console.log(userList);

  // pagination ===============================

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  const totalUsers = userList.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage + 1;
  const endIndex = Math.min(startIndex + usersPerPage - 1, totalUsers);

  const visibleUsers = userList.slice(startIndex - 1, endIndex);

  //  table toggle ===================================

  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggleTalbe = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // create user popup Modal=========================
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}hr ${mins}min`;
  };

  // api Fetch=================

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      const access_token = localStorage.getItem("access_token");
      try {
        const [adminStatRes, userStatRes, userListRes] = await Promise.all([
          fetch("http://51.20.246.38:5000/api/admindashboard", {
            method: "GET",
            // mode: 'no-cors',

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }),
          fetch("http://51.20.246.38:5000/api/top_users", {
            method: "GET",
            // mode: 'no-cors',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }),
          fetch("http://51.20.246.38:5000/api/userlist", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }),
        ]);

        const [admin, user, uList] = await Promise.all([
          adminStatRes.json(),
          userStatRes.json(),
          userListRes.json(),
        ]);

        setAdminStat(admin);
        setUserStat(user);
        setUserList(uList);
      } catch (error) {
        console.log("Admin DashBoard Data Fetch Failed", error);
      }
    };

    fetchAdminDashboardData();
  }, []);

  return (
    <>
      {/* <div className="container"> */}
      <div className="adminDashboardContainer">
        <div className="adminDashboardTop">
          <div className="adminTopLeft">
            <div className="adminDetailsTopCard">
              <div className="adminDetailsCard">
                <div className="adminDetailsLeft">
                  <h3>Total Users</h3>
                  <h1>{adminStat.total_users}</h1>
                </div>

                <div className="adminDetailsRight">
                  <img src={PeopleGroup} alt="" />
                </div>
              </div>

              <div className="adminProgessBar">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-75"></div>
                </div>

                <div className="progessDetails">
                  <h2>30%</h2>
                </div>
              </div>
            </div>

            <div className="adminDetailsTopCard">
              <div className="adminDetailsCard">
                <div className="adminDetailsLeft">
                  <h3>Total Pages Assigned</h3>
                  <h1>{adminStat.total_pages}</h1>
                </div>

                <div className="adminDetailsRight">
                  <img src={assignedPage} alt="" />
                </div>
              </div>
              <div className="adminProgessBar">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-75"></div>
                </div>

                <div className="progessDetails">
                  <h2>30%</h2>
                </div>
              </div>
            </div>

            <div className="adminDetailsTopCard">
              <div className="adminDetailsCard">
                <div className="adminDetailsLeft">
                  <h3>Total Pages Completed</h3>
                  <h1>{adminStat.pages_completed}</h1>
                </div>

                <div className="adminDetailsRight">
                  <img src={completePage} alt="" />
                </div>
              </div>
              <div className="adminProgessBar">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-75"></div>
                </div>

                <div className="progessDetails">
                  <h2>30%</h2>
                </div>
              </div>
            </div>

            <div className="adminDetailsTopCard">
              <div className="adminDetailsCard">
                <div className="adminDetailsLeft">
                  <h3>Total Time Taken</h3>
                  <h1>{adminStat.total_transcription_time}</h1>
                </div>

                <div className="adminDetailsRight">
                  <img src={timeTaken} alt="" />
                </div>
              </div>
              <div className="adminProgessBar">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-75"></div>
                </div>

                <div className="progessDetails">
                  <h2>30%</h2>
                </div>
              </div>
            </div>

            <div className="adminDetailsTopCard">
              <div className="adminDetailsCard">
                <div className="adminDetailsLeft">
                  <h3>Total Recordings</h3>
                  <h1>1213</h1>
                </div>

                <div className="adminDetailsRight">
                  <img src={totalRecording} alt="" />
                </div>
              </div>
              <div className="adminProgessBar">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-75"></div>
                </div>

                <div className="progessDetails">
                  <h2>30%</h2>
                </div>
              </div>
            </div>

            <div className="adminDetailsTopCard">
              <div className="adminDetailsCard">
                <div className="adminDetailsLeft">
                  <h3>Pending Pages</h3>
                  <h1>{adminStat.pages_left}</h1>
                </div>

                <div className="adminDetailsRight">
                  <img src={pendingPage} alt="" />
                </div>
              </div>
              <div className="adminProgessBar">
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar w-75"></div>
                </div>

                <div className="progessDetails">
                  <h2>30%</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="adminTopRight">
            <div className="leaderBoard">
              <div className="leaderBoardHeading">
                <h3>LEADERBOARD</h3>
              </div>

              <div className="leaderBoardHeading">
                <button>View All</button>
              </div>
            </div>

            <div className="adminLeaderTable">
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Name</th>
                    <th scope="col">Pdf Complete</th>
                    <th scope="col">Spend Time</th>
                    <th scope="col">Pages Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {userStat.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>{}
                      {/* Rank based on index */}
                      <td>{data.username}</td>
                      <td>{data.completed_pages}</td>
                      <td>{data.total_time}</td>
                      <td>{data.total_pages - data.pending_pages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM TABLE  */}

        <div className="adminDashBottomTable">
          <div className="adminUserListHeading">
            <h1>USERS LIST</h1>
            <button onClick={handleOpenModal}>Create New User</button>
          </div>

          <div className="useTableSearch">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
            </div>

            <div className="userListFilter">
              <div className="filter">
                <div className="filterheading">
                  <h3>Filter</h3>
                </div>
                <div className="filterLogo">
                  <i class="fa-solid fa-filter"></i>
                </div>
              </div>

              <div className="sortby">
                <div className="shortbyHeading">
                  <h3>Short By</h3>
                </div>

                <div className="shortByLogo">
                  <h3>Relevance</h3>
                  <i class="fa-solid fa-angle-down"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="userProgressTable">
            <table className="table text-center custom-user-table">
              <thead className="table-primary">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Pages Assigned</th>
                  <th scope="col">Pages Completed</th>
                  <th scope="col">Time Taken</th>
                  <th scope="col">Avg Time/Page</th>
                  <th scope="col">Pending Pages</th>
                  <th scope="col">PDF Completed</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map((user, index) => {
                  const globalIndex = (currentPage - 1) * usersPerPage + index;

                  return (
                    <React.Fragment key={globalIndex}>
                      <tr
                        onClick={() => handleToggleTalbe(globalIndex)}
                        style={{ cursor: "pointer" }}
                      >
                        <th scope="row">
                          <div className="d-flex align-items-center justify-content-center gap-2 position-relative">
                            <input type="checkbox" />
                            <i
                              className={`fa-solid fa-caret-down arrow-icon ${
                                expandedRow === globalIndex ? "rotate" : ""
                              }`}
                            ></i>
                            <span>{user.username}</span>
                          </div>
                        </th>
                        <td>{user.pages_assigned}</td>
                        <td>{user.pages_completed}</td>
                        <td>{user.time_taken}</td>
                        <td>{user.avg_time_per_page}</td>
                        <td>{user.pending_pages}</td>
                        <td>{user.pdf}</td>
                      </tr>

                      {expandedRow === globalIndex && (
                        <tr className="expanded-row inner-table">
                          <td colSpan="7">
                            <div className="inner-table-wrapper">
                              <table className="table table-bordered inner-table mb-0">
                                <thead className="table-secondary">
                                  <tr>
                                    <th>PDF</th>
                                    <th>Page Name</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Time Taken</th>
                                    <th>Recording</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {user.pdf_info.map((pdf, idx) => (
                                    <tr key={idx}>
                                      <td>{pdf.document_name}</td>
                                      <td>{pdf.pages_left}</td>
                                      <td>-</td>
                                      <td>-</td>
                                      <td>{pdf.total_time}</td>
                                      <td>
                                        <button className="btn btn-sm btn-outline-primary">
                                          View
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* <div className="adminDashUserTablePage">
            <div className="adminDashUserTableLeft">
              <h3>
                Showing<span> 1-20</span> of<span> 124</span> Result
              </h3>
            </div>

            <div className="admiDashUserTableRight">
              <nav aria-label="Page navigation example">
                <ul class="pagination custom-pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>

                  <li class="page-item">
                    <a class="page-link active" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      4
                    </a>
                  </li>

                  <li class="page-item disabled">
                    <a class="page-link" href="#">
                      ...
                    </a>
                  </li>

                  <li class="page-item">
                    <a class="page-link" href="#">
                      40
                    </a>
                  </li>

                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div> */}
          <div className="adminDashUserTablePage">
            <div className="adminDashUserTableLeft">
              <h3>
                Showing
                <span>
                  {" "}
                  {startIndex}-{endIndex}
                </span>{" "}
                of
                <span> {totalUsers}</span> Result
              </h3>
            </div>

            <div className="admiDashUserTableRight">
              <nav aria-label="Page navigation example">
                <ul className="pagination custom-pagination">
                  {/* Previous */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>

                  {/* Dynamic Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(0, 5) // show first 5 pages (you can make this smarter)
                    .map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                  {totalPages > 5 && (
                    <>
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </li>
                    </>
                  )}

                  {/* Next */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* {showModal && <CreateUserModal onClose={handleCloseModal} />} */}
      <CreateUserModal isOpen={showModal} onClose={handleCloseModal} />
    </>
  );
};

export default Dashboard;
