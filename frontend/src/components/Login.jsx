// // Login.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import backgroundImg from '../sansad-bg.png'; // ⬅️ place the downloaded image in src/assets/
// import './login.css'
// import loginImg from '../assest/login.png';
// import ReCAPTCHA from 'react-google-recaptcha';
// import { Eye, EyeOff } from 'lucide-react';

// const Login = () => {

//   const [captchaToken, setCaptchaToken] = useState(null);
//   // const [passwordVisible, setPasswordVisible] = useState(false);

//   const handleCaptchaChange = (value) => {
//     setCaptchaToken(value);
//     console.log('Captcha value:', value);
//   };

//   const togglePassword = () => {
//     setPasswordVisible(prev => !prev);
//   };


//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem('user_id');
//     const role = localStorage.getItem('role');
//     if (userId) {
//       navigate(role === 'admin' ? '/admin-dashboard' : '/my-dashboard');
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!captchaToken) {
//       alert("Please complete the captcha!");
//       return;
//     }


//     try {
//       const res = await fetch('http://localhost:5001/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ username, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem('user_id', data.user_id);
//         localStorage.setItem('username', data.username);
//         localStorage.setItem('role', data.role);
//         alert('Login successful');
//         navigate(data.role === 'admin' ? '/admin-dashboard' : '/my-dashboard');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (error) {
//       alert('Error logging in: ' + error.message);
//     }
//   };

//   return (
//     <>
//     {/* <div
//       className="login-wrapper"
//       style={{
//         backgroundImage: `url(${backgroundImg})`,
//         height: '100vh',
//         width: '100vw',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//       >
//       <div className="login-card">
//         <h2>Sansad Portal Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             required
//             />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             />
//           <button type="submit">Login</button>
//         </form>
//         <div className="login-footer">
//           <span>Signup</span>
//           <span>Forgot Password?</span>
//         </div>
//       </div>
//     </div> */}


//     <div className="login">
//       <div className="loginContainer">
//         <div className="mainLogin">
//           <div className="loginLeft">
//             <img src={loginImg} alt="" />
//           </div>

//           <div className="loginRight">
//             <h1>LOGIN</h1>
//             <form onSubmit={handleLogin}>
//               <div className="loginFromInput">
//                 <label htmlFor="Username">Username</label>
//                 <input type="text" name="" id="" value={username}
//             onChange={e => setUsername(e.target.value)} placeholder='Enter Your Name'/>
//               </div>
//               {/* <div className="loginFromInput">
//                 <label htmlFor="Username">Password</label>
//                 <input type="text" name="" id="" value={password}
//             onChange={e => setPassword(e.target.value)} placeholder='Enter Your Password'/>
//               </div> */}

// <div className="loginFromInput" style={{ position: 'relative' }}>
//                 <label htmlFor="Password">Password</label>
//                 <input
//                   type={passwordVisible ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   placeholder="Enter Your Password"
//                 />
//                 <span
//                   onClick={togglePassword}
//                   style={{
//                     position: 'absolute',
//                     right: '10px',
//                     top: '38px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </span>
//               </div>

//               <div className="loginFromInput">
//               <ReCAPTCHA
//                   sitekey="YOUR_SITE_KEY" // Replace with your actual key
//                   onChange={handleCaptchaChange}
//                 />
//               </div>
//               <div className="loginBtn">
//                 <button type='submit'>Continue</button>
//               </div>
//             </form>
//             <div className="loginForget">
//               <p>Forgot Password?</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   </>
//   );
// };

// export default Login;


// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../sansad-bg.png'; // ⬅️ place the downloaded image in src/assets/
import './login.css'
import loginImg from '../assest/login.png';
import ReCAPTCHA from 'react-google-recaptcha';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {

  const [captchaToken, setCaptchaToken] = useState(null);
  // const [passwordVisible, setPasswordVisible] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaToken(value);
    console.log('Captcha value:', value);
  };

  const togglePassword = () => {
    setPasswordVisible(prev => !prev);
  };


  const [passwordVisible, setPasswordVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');
    if (userId) {
      navigate(role === 'admin' ? '/admin-dashboard' : '/my-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!captchaToken) {
    //   alert("Please complete the captcha!");
    //   return;
    // }
//  localStorage.removeItem('user_id');
//     localStorage.removeItem('username');
//     localStorage.removeItem('role');
//     localStorage.removeItem('access_token');


    try {
      const res = await fetch('http://51.20.246.38:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        //mode: 'no-cors',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        localStorage.setItem('access_token', data.access_token);
        alert('Login successful');
        navigate(data.role === 'admin' ? '/admin-dashboard' : '/my-dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Error logging in: ' + error.message);
    }
  };

  return (
    <>
    <div className="login">
      <div className="loginContainer">
        <div className="mainLogin">
          <div className="loginLeft">
            <img src={loginImg} alt="" />
          </div>

          <div className="loginRight">
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
              <div className="loginFromInput">
                <label htmlFor="Username">Username</label>
                <input type="text" name="" id="" value={username}
            onChange={e => setUsername(e.target.value)} placeholder='Enter Your Name'/>
              </div>
              {/* <div className="loginFromInput">
                <label htmlFor="Username">Password</label>
                <input type="text" name="" id="" value={password}
            onChange={e => setPassword(e.target.value)} placeholder='Enter Your Password'/>
              </div> */}

<div className="loginFromInput" style={{ position: 'relative' }}>
                <label htmlFor="Password">Password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
                <span
                  onClick={togglePassword}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '38px',
                    cursor: 'pointer',
                  }}
                >
                  {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <div className="loginFromInput">
              <ReCAPTCHA
                  sitekey="YOUR_SITE_KEY" // Replace with your actual key
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className="loginBtn">
                <button type='submit'>Continue</button>
              </div>
            </form>
            <div className="loginForget">
              <p>Forgot Password?</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
  );
};

export default Login;

