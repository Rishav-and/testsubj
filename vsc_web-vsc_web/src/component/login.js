import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faLock} from '@fortawesome/free-solid-svg-icons'

import fire, { auth } from "./Firebase";

function Signup() {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(false);
  const [values, setValues] = useState({
    
    email: "",
    pass: "",
  });
  function handleForgotPassword(){
    let email  = window.prompt("Enter the email")
    fire
    .auth()
    .sendPasswordResetEmail(email)

  };
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.email,
        });
        navigate("/paitentinput");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
      alert(errorMsg);
  };
  const handleLogin = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        navigate("/paitentinput");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
      alert(errorMsg);
  };

  return (
    <div >
      <div className="body">
    <div className="side text-center my-5">
        <img src="img.svg" alt="" />
    </div>
      <div className="main">

        <div className="loginContainer">
         <p className="title">Welcome Back</p>
         <div className="separator"></div>
            <h4 className="welcomMessage">Please, provide login credential to proceed and have access to all our services</h4>
       <div className="loginForm">
         <div className="formControl" >
         <input
         className="input"
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
         />
         <FontAwesomeIcon className="fontIcon" icon={faUser} />
        </div>
        <div className="formControl">
      
         <input type="password" className="input"
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
         />
         <FontAwesomeIcon className="fontIcon" icon={faLock} />
        </div>

        <div >
          <b />
           
        
             
                 <button className="submitButton " onClick={handleLogin}  disabled={submitButtonDisabled}>
            Login
          </button>
          <h4 className=" forgot texthover" style={{cursor:"pointer" }} onClick={handleForgotPassword}>Forgot Password?</h4>
            
         
             
             </div>
             </div>
             </div>

       
      </div>
      
      
    
</div>
    </div>
  );
}

export default Signup;

// import React, { useState } from "react";
// import {  useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// // signInWithEmailAndPassword
// import fire, { auth} from "./Firebase";



// function Login() {
//   const navigate = useNavigate();
//   const [hasAccount, setHasAccount] = useState(false);
//   const [values, setValues] = useState({
    
//     email: "",
//     pass: "",
//   });
  
//   const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  // function handleForgotPassword(){
  //   let email  = window.prompt("Enter the email")
  //   fire
  //   .auth()
  //   .sendPasswordResetEmail(email)

  // };
//   const handleSignUp = () => {
//     if ( !values.email || !values.pass) {
    
//       alert("Fill all field");
//       return;
//     }
    

//     setSubmitButtonDisabled(true);
//     createUserWithEmailAndPassword(auth, values.email, values.pass)
//       .then(async (res) => {
//         setSubmitButtonDisabled(false);
//         const user = res.user;
//         await updateProfile(user, {
//           displayName: values.email,
//         });
//         navigate("/paitentinput");
//       })
//       .catch((err) => {
//         setSubmitButtonDisabled(false);
//         alert(err.message);
        
//       });
      
//   };
 // const handleLogin = () => {
    // if (!values.email || !values.pass) {
    //   alert("Fill all fields");
    //   return;
    // }
    

    // setSubmitButtonDisabled(true);
    // signInWithEmailAndPassword(auth, values.email, values.pass)
    //   .then(async (res) => {
    //     setSubmitButtonDisabled(false);
        
    //     navigate("/paitentinput");
    //   })
    //   .catch((err) => {
    //     setSubmitButtonDisabled(false);
    //     alert(err.message);
    //   });
  //};

//   return (
//     <div >
      // <div className="container contact_div my-5 ">
      //  <div className="row">
      //   <div className="col-md-6 col-10 mx-auto">
    //     <div style={{textAlign:"left"}}  >
    //  <div > 
    //          {hasAccount ? (
    //              <>
    //              <h1> Login to your account </h1>
    //              </>
    //          ) : (
    //              <>
    //              <h1 > Sign Up to a new Account </h1>
    //              </>
    //          )
    //          }
    //          </div>
    //          </div>

//              <form className="mb-5" style={{fontSize:"1.7rem"}}>
//              <div className="mb-3">
//         <label class="form-label">Username</label><br />
//         <input
//           label="Email"
//           placeholder="Enter email address"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, email: event.target.value }))
//           }
//         />
//         </div>
      // <div class="mb-3">
      // <label class="form-label">Password</label><br />
//         <input
//           label="Password"
//           placeholder="Enter password"
//           onChange={(event) =>
//             setValues((prev) => ({ ...prev, pass: event.target.value }))
//           }
//         />
//         </div>

        
          
//           <div class="col-12 py-3 mb-3">
{/* <div > 
             {hasAccount ? (
                 <>
                 <button className="custom-btn " disabled={submitButtonDisabled} onClick={handleLogin} >Sign In</button>
                 <p className="changeInSentence">Don't have an account?
                  <span className='texthover' style={{cursor:"pointer"}} onClick={() =>setHasAccount(!hasAccount)}>Sign Up</span> </p>
                 </>
             ) : (
                 <>
                 <button className="custom-btn " disabled={submitButtonDisabled} onClick={handleSignUp}>Sign Up</button>
                 <p className="changeInSentence">Have an account? 
                 <span className='texthover' style={{cursor:"pointer"}} onClick={() =>setHasAccount(!hasAccount)}>Login</span></p>
                 </>
             )
             }
             <span className=" forgot texthover" style={{cursor:"pointer" }} onClick={handleForgotPassword}>Forgot Password?</span>
             </div>
</div> */}

        
        
//         </form>
//       </div>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

////////////////////////////////////////////////////////////////////////////////////////////
// import React, {useState, useEffect} from 'react';
// import fire, {auth} from "./Firebase.js";
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// import "../App.css";
// import { useNavigate } from 'react-router-dom';


// function Login(props) {
  
  
  
  
//   const {email,user ,setEmail, emailError, password,setPassword, passwordError,hasAccount,setHasAccount,handleLogin,handleSignUp} = props;
//   const navigate = useNavigate();
    // function handleForgotPassword(){
    //   let email  = window.prompt("Enter the email")
    //   fire
    //   .auth()
    //   .sendPasswordResetEmail(email)
  
    // };
  
  
//     return (
//       <div>
     
//      {user?(
//        navigate("/search") 
//      ):(
    
//     <div className="container contact_div my-5 ">
//       <div className="row">
//         <div className="col-md-6 col-10 mx-auto">
 
    //     <div style={{textAlign:"left"}}  >
    //  <div > 
    //          {hasAccount ? (
    //              <>
    //              <h1> Login to your account </h1>
    //              </>
    //          ) : (
    //              <>
    //              <h1 > Sign Up to a new Account </h1>
    //              </>
    //          )
    //          }
    //          </div>
    //          </div>
      
//        <form className="mb-5" style={{fontSize:"1.7rem"}}>
     
//    <div className="mb-3">
//        <label class="form-label">Username</label><br />
//       <input
//             type="text"
//             placeholder="Enter Username"
//             autoFocus
//             required
            
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//       />
//        <p className="errorMsg">{emailError}</p>
//   </div>

// <div class="mb-3"> 
//   <label class="form-label">Password</label><br />
//     <input
//             type="password"
//             placeholder="Enter Password"
//             autoFocus
//             required
            
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//     />
//         <p className="errorMsg">{passwordError}</p>
//   </div>

{/* <div class="col-12 py-3 mb-3">
<div > 
             {hasAccount ? (
                 <>
                 <button className="custom-btn "  >Sign In</button>
                 <p className="changeInSentence">Don't have an account?
                  <span className='texthover' style={{cursor:"pointer"}} onClick={() =>setHasAccount(!hasAccount)}>Sign Up</span> </p>
                 </>
             ) : (
                 <>
                 <button className="custom-btn " onClick={handleSignUp}>Sign Up</button>
                 <p className="changeInSentence">Have an account? 
                 <span className='texthover' style={{cursor:"pointer"}} onClick={() =>setHasAccount(!hasAccount)}>Login</span></p>
                 </>
             )
             }
             <span className=" forgot texthover" style={{cursor:"pointer" }} onClick={handleForgotPassword}>Forgot Password?</span>
             </div>
</div> */}

// </form>

//         </div>
//       </div>
//     </div>
      
       
     
//     )}
//       </div>
     
//     );
  
  
  
    
// }


// export default Login;


