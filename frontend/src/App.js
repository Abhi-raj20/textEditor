// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './components/Admin/adminDashboard/Dashboard';
// import AddUser from './components/Admin/AddUser';
// import UploadDocument from './components/Admin/UploadDocument';
// import Login from './components/Login';
// import MyPages from './components/User/MyPages';
// import UserDashboard from './components/User/userDashboard/UserDashboard';
// import Layout from './components/User/layout';
// import AdminLayout from './components/layout/AdminLayout';
// import TextEditor from './components/User/textEditor/TextEditor';

// const App = () => {
//   const [role, setRole] = useState(localStorage.getItem('role'));

//   // Watch for role change after login
//   useEffect(() => {
//     const checkRole = () => {
//       const storedRole = localStorage.getItem('role');
//       setRole(storedRole);
//     };

//     window.addEventListener('storage', checkRole);
//     checkRole();

//     return () => window.removeEventListener('storage', checkRole);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/text-editor" element={<TextEditor />} />

//         {/* {role === 'user' ? ( */}
//           <Route element={<AdminLayout />}>
//             <Route path="/my-dashboard" element={<UserDashboard />} />
//             <Route path="/my-pages" element={<MyPages />} />
//             <Route path="*" element={<Navigate to="/my-dashboard" />} />
//           </Route>
//         {/* ) : role === 'admin' ? ( */}
//           <>
//             <Route element={<AdminLayout />} >
//               <Route path="/admin-dashboard" element={<Dashboard />} />
//               <Route path="/add-user" element={<AddUser />} />
//               <Route path="/upload-document" element={<UploadDocument />} />
//               <Route path="*" element={<Navigate to="/admin-dashboard" />} />
//             </Route>
//           </>
//         {/* ) : ( */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         {/* )} */} 
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Admin/adminDashboard/Dashboard';
import AddUser from './components/Admin/AddUser';
import UploadDocument from './components/Admin/UploadDocument';
import Login from './components/Login';
import MyPages from './components/User/MyPages';
import UserDashboard from './components/User/userDashboard/UserDashboard';
import Layout from './components/User/layout';
import AdminLayout from './components/layout/AdminLayout';
import TextEditor from './components/User/textEditor/TextEditor';
import PdfPages from './components/User/pdfpages/PdfPages';
import PdfCheck from './components/User/pdfChecker/PdfCheck';



const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Watch for role change after login
  useEffect(() => {
    const checkRole = () => {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
    };

    window.addEventListener('storage', checkRole);
    checkRole();

    return () => window.removeEventListener('storage', checkRole);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/text-editor" element={<TextEditor />} />
        <Route path="/pdf-pages" element={<PdfPages />} />
        <Route path="/pdf-check" element={<PdfCheck />} />

        {role === 'user' ? (
          <Route element={<AdminLayout />}>
            <Route path="/my-dashboard" element={<UserDashboard />} />
            <Route path="/my-pages" element={<MyPages />} />
            <Route path="*" element={<Navigate to="/my-dashboard" />} />
          </Route>
         ) : role === 'admin' ? ( 
          <>
            <Route element={<AdminLayout />} >
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/upload-document" element={<UploadDocument />} />
              <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            </Route>
          </>
         ) : ( 
          <Route path="*" element={<Navigate to="/login" />} />
       )}
      </Routes>
    </Router>
  );
};

export default App;
