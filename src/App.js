import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./component/Home";
import Contact from "./component/Contact";
import About from "./component/About";
import Service from "./component/Service";
import Navbar from "./component/navbar";
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
    
    <Navbar />
      <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/contact" element={<Contact />} />
      <Route  path="/about" element={<About />} />
      <Route  path="/service" element={<Service />} />
      
      </Routes>
    </Router>
    
  
    </>
  
  );
}

export default App;
