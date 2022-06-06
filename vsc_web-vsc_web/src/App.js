import React,  {useState, useEffect} from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./component/Home";
import Contact from "./component/Contact";
import About from "./component/About";
import PaitentInput from "./component/PaitentInput";
import Service from "./component/Service";
import Navbar from "./component/navbar";
import Search from "./component/search";
import Detail from "./component/detail";
import Login from "./component/login";
import fire from "./component/Firebase";


import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
function App() {
  const [user, setUser] = useState("");

  function handleLogout(){
      fire.auth().signOut();
  };

  const authListener =() => {
      fire.auth().onAuthStateChanged((user) => {
          if(user) {
            
              setUser(user);
          } else {
              setUser("");
          }
      });
  };

  useEffect(() => {
      authListener();
  }, []);

 console.log(user);
  return (
    <>
    <Router>
    
    <Navbar handleLogout={handleLogout} user={user} />
      <Routes>
      <Route path="/login" element={<Login 
     
       />} />
      <Route  path="/" element={<Home />} />
      <Route  path="/contact" element={<Contact />} />
      <Route  path="/about" element={<About />} />
      <Route  path="/service" element={<Service />} />
      <Route path="/jhg" element ={<p>Services is ok</p>} />
      <Route path="/paitentinput" element={<PaitentInput 
        user={user}
      />} />
      <Route path="/search" element={<Search
      user={user}
       />} />
      <Route path="/search/:id" element={<Detail user={user}/>} />
     
      </Routes>
    </Router>
    
  
    </>
  
  );
}

export default App;
