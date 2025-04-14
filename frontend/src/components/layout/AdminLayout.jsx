// import React,{useState} from 'react';
// import { Outlet } from 'react-router-dom';
// import './adminLayout.css';
// import logo from "../../assest/Logo.png";
// import active from "../../assest/active.png";
// import bag from "../../assest/bag.png";
// import person from "../../assest/person.png";
// import setting from "../../assest/setting.png";
// import notification from "../../assest/Notification.png";
// import profile from "../../assest/profile.png";
// import PdfUploadModal from '../modal/pdfUploadModal/PdfUploadModal';

// const AdminLayout = () => {

//   const [showModal, setShowModal] = useState(false);
  
  
//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

 
//   return (
//     <>
//       {/* <div className="container"> */}
//         <div className="adminLayoutContainer">
//           {/* Sidebar */}
//           <div className="sideBar">
//             <div className="logo">
//               <img src={logo} alt="" />
//             </div>

//             <div className="sideNavigation">
//               <div className="navItem">
//                 <img src={active} alt="" />
//               </div>
//               <div className="navItem">
//                 <img src={bag} alt="" />
//               </div>
//               <div className="navItem">
//                 <button onClick={handleOpenModal}>

//                   <img src={person} alt="" />
//                 </button>
//               </div>
//               <div className="navItem">
//                 <img src={setting} alt="" />
//               </div>
//             </div>
//           </div>

//           {/* Right section: Topbar + Page content */}
//           <div className="rightSection">
//             <div className="topBar">
//               <div className="topNavBar">
//                 <div className="topNavLeft">
//                   <h3>Dashboard</h3>
//                 </div>
//                 <div className="topNavRight">
//                   <div className="bell">
//                     <img src={notification} alt="" />
//                   </div>
//                   <div className="userPhoto">
//                     <img src={profile} alt="" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* This is where child routes like Dashboard, AddUser, etc will be rendered */}
//             <div className="mainContent">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//         {/* {showModal && <PdfUploadModal onClose={handleCloseModal} />} */}
//       <PdfUploadModal isOpen={showModal} onClose={handleCloseModal} />

//       {/* </div> */}
//     </>
//   );
// };

// export default AdminLayout;


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './adminLayout.css';
import logo from "../../assest/Logo.png";
import active from "../../assest/active.png";
import bag from "../../assest/bag.png"; 
import person from "../../assest/person.png";
import setting from "../../assest/setting.png";
import notification from "../../assest/Notification.png";
import profile from "../../assest/profile.png";
import PdfUploadModal from '../modal/pdfUploadModal/PdfUploadModal';

const AdminLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  
  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };
  
  const handleLogoutConfirm = () => {
   
         localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('access_token');
    localStorage.removeItem('userToken'); 
    window.location.href = '/login'; // Replace with your login route
  };
  
  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };
  
  return (
    <>
      <div className="adminLayoutContainer">
        {/* Sidebar */}
        <div className="sideBar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          
          <div className="sideNavigation">
            <div className="navItem">
              <img src={active} alt="" />
            </div>
            <div className="navItem">
              <img src={bag} alt="" />
            </div>
            <div className="navItem">
              <button onClick={handleOpenModal}>
                <img src={person} alt="" />
              </button>
            </div>
            <div className="navItem">
              <img src={setting} alt="" />
            </div>
          </div>
        </div>
        
        {/* Right section: Topbar + Page content */}
        <div className="rightSection">
          <div className="topBar">
            <div className="topNavBar">
              <div className="topNavLeft">
                <h3>Dashboard</h3>
              </div>
              <div className="topNavRight">
                <div className="bell">
                  <img src={notification} alt="" />
                </div>
                <div className="userPhoto" style={{ position: 'relative' }}>
                  <img
                    src={profile}
                    alt=""
                    onClick={toggleDropdown}
                    style={{ cursor: 'pointer' }}
                  />
                  
                  {/* Profile Dropdown */}
                  {showDropdown && (
                    <div className="profileDropdown" style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '8px 0',
                      width: '150px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      zIndex: 1000
                    }}>
                      <div className="dropdownItem" style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }} 
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                      onClick={handleLogoutClick}>
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* This is where child routes like Dashboard, AddUser, etc will be rendered */}
          <div className="mainContent">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* PDF Upload Modal */}
      <PdfUploadModal isOpen={showModal} onClose={handleCloseModal} />
      
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '350px',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '16px' }}>Are you sure you want to logout?</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button 
                onClick={handleLogoutCancel}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleLogoutConfirm}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;