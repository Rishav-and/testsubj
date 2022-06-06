import { useState, useEffect } from "react";
import React from "react";
import {useNavigate} from "react-router-dom";


import { db } from "./Firebase";


function PaitentInput(props){
  const navigate = useNavigate();
  const {user} =props;
    const [Date, setDate] = useState("");
    const [name , setName] = useState("");
    const [city , setCity] = useState("");
    const [ center, setCenter] = useState("");
    const [ address, setAddress] = useState("");
    const [ detail, setDetail] = useState("");
    const [whatsapp , setWhatsapp] = useState("");
    const [ age, setAge] = useState("");
    const [ gender, setGender] = useState("");
    const [ doctorName, setDoctorName] = useState("");
    const [ email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [dateError , setDateError] = useState("");
    const [nameError , setNameError] =useState("");
    const [cityError , setCityError] = useState("");
    const [centerError , setCenterError] = useState("");
    const [addressError , setAddressError] = useState("");
    const [detailError , setDetailError] = useState("");
    const [whatsappError, setWhatsappError] = useState("");
    const [ageError , setAgeError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [doctorNameError, setDoctorNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [posts, setPosts]= useState([]);
 
    
    useEffect(() => {
      const getPosts = [];
      const details = db
      .collection("Doctors")
      .onSnapshot((querySnapshot) =>{
          querySnapshot.forEach((doc)=> {
            getPosts.push({
                ...doc.data(),
                key: doc.id,
            });
     
          });
          setPosts(getPosts);
            
      });
      return () => details();
    
  }, []);

    
    function validate(){
      let emailError = "";
      let dateError ="";
      let nameError = "";
      let cityError ="";
      let centerError ="";
      let addressError ="";
      let detailError ="";
      let whatsappError ="";
      let ageError ="" ;
      let genderError ="";
      let doctorNameError = "";
      

      if (!email.includes("@")){
        emailError="invalid email";
      }
      if (!Date){
        dateError="Date cannot be empty";
      }
      if (!name){
        nameError="Name cannot be empty";
      }
      if (!city){
        cityError="City cannot be empty";
      }
      if (!center){
        centerError="Center cannot be empty";
      }
      if (!address){
        addressError="Address cannot be empty";
      }
      if (!detail){
        detailError="Details cannot be empty";
      }
      if (!whatsapp.match(/^[0-9\b]+$/) ){
        whatsappError="Whatsapp cannot be empty and numbers only";
      }
      if (!age.match(/^[0-9\b]+$/) ){
        ageError="Age cannot be empty and numbers only";
      }
      if (!gender){
        genderError="Gender cannot be empty";
      }
      if (!doctorName){
        doctorNameError="Doctor's name cannot be empty";
      }

      if (emailError || dateError|| nameError||cityError || centerError|| addressError|| detailError||whatsappError||ageError|| genderError||doctorNameError) {
        setEmailError(emailError);
        setDateError(dateError);
        setNameError(nameError);
        setCityError(cityError);
        setCenterError(centerError);
        setAddressError(addressError);
        setDetailError(detailError);
        setWhatsappError(whatsappError);
        setAgeError(ageError);
        setGenderError(genderError);
        setDoctorNameError(doctorNameError);

        return false;
      }

      return true;

    }

    function handleSubmit(e) {

        e.preventDefault();
        const isValid = validate();
        var id = Math.floor(Math.random() * 10000000000).toString();
       if (isValid) {
         // create a random no and make it a const and assign it to id
        
        db.collection("PaitentDetail")
        .add({
            name: name,
            date: Date,
            emial: email,
            city : city,
            center: center,
            address: address,
           id: id,
            detail: detail,
            whatsapp: whatsapp,
            age: age,
            gender: gender,
            doctorName: doctorName,

        })
        .then(()=> {
            alert("message has been sent!👏");
            
        })
        .catch((err) => {
            setErrorMsg(err.message);
            alert(errorMsg);
        });
        

        setDoctorName("");
        setEmail("");
        setGender("");
        setAge("");
        setWhatsapp("");
        setDetail("");
     
        setAddress("");
        setCenter("");
        setCity("");
        setDate("");
        setEmailError("");
        setDateError("");
        setNameError("");
        setCityError("");
        setCenterError("");
        setAddressError("");
        setDetailError("");
        setWhatsappError("");
        setAgeError("");
        setGenderError("");
        setDoctorNameError("");
    }
  }

    return (
      <>
      {user? (
        <div>
        <div className="paiBody">
      
           <div className="paicontainer">
    <div className="paititle"> Form for paitent entry</div>
    
    <div className="paicontent">
      
     
         <form className="paiForm" >
           <div className="user-details">
          <div className="input-box">
    <label  class="details">Full Name <span style={{color:"red"}}>*</span> </label><br/>
    <input  type="text" className="paiinput" value ={name}
            onChange ={e => setName(e.target.value)}  placeholder="Enter Your Name" />
            <div style={{color: "red", fontSize: ".75em"}} >{nameError}</div>
  </div>
  <div className="input-box">
    <label  >Date <span style={{color:"red"}}>*</span></label><br/>
    <input className="paiinput" type="date"  value={Date}
      onChange={e => setDate(e.target.value)} placeholderText="date"
    />
   <div style={{color: "red", fontSize: ".75em"}} >{dateError}</div>
  </div>
  <div className="input-box">
    <label class="details">Email address <span style={{color:"red"}}>*</span></label><br/>
    <input className="paiinput" type="email" value ={email}
            onChange ={e => setEmail(e.target.value)}   placeholder="name@example.com" />
            <div style={{color: "red", fontSize: ".75em"}} >{emailError}</div>
  </div>
  <div className="input-box">
    <label  class="details">City <span style={{color:"red"}}>*</span></label>
    <div>
      <select className="paiinput" 
            value ={city}
            onChange ={e => setCity(e.target.value)}>
                <option value="">Select</option>
                <option value="Bihar">Bihar</option>
                <option value="UP">UP</option>
       </select>
       <div style={{color: "red", fontSize: ".75em"}} >{cityError}</div>
     </div>
  </div>
  
  <div className="input-box">
    <label  class="details ">Center <span style={{color:"red"}}>*</span></label>
    <div>
    <select className="paiinput" 
            value ={center}
            onChange ={e => setCenter(e.target.value)}>
                <option value="">Select</option>
                <option value="camp">Camp</option>
                <option value="patna">Patna</option>
            </select>
            <div style={{color: "red", fontSize: ".75em"}} >{centerError}</div>
     </div>
  </div>
  <div className="input-box">
    <label  class="details ">Address <span style={{color:"red"}}>*</span></label><br />
    <textarea  className="paiinput" placeholder="address" 
            value ={address}
            onChange ={e => setAddress(e.target.value)}></textarea>
            <div style={{color: "red", fontSize: ".75em"}} >{addressError}</div>
  </div>
  <div className="input-box">
    <label  class="details ">Details <span style={{color:"red"}}>*</span></label><br />
    <textarea  className="paiinput" placeholder="detail"
            value ={detail}
            onChange ={e => setDetail(e.target.value)}></textarea>
            <div style={{color: "red", fontSize: ".75em"}} >{detailError}</div>
          
  </div>
 
  <div className="input-box">
    <label  class="details">Whatsapp <span style={{color:"red"}}>*</span></label> <br />
    <input className="paiinput" placeholder="Whatsapp"
            value ={whatsapp}
            onChange ={e => setWhatsapp(e.target.value)} />
            <div style={{color: "red", fontSize: ".75em"}} >{whatsappError}</div>
  </div>
  <div className="input-box">
    <label  class="details">Age <span style={{color:"red"}}>*</span></label><br />
    <input className="paiinput"  placeholder="age" value ={age}  onChange ={e => setAge(e.target.value)} />
    <div style={{color: "red", fontSize: ".75em"}} >{ageError}</div>
  </div>
  <div className="input-box">
    <label  class="details">Gender <span style={{color:"red"}}>*</span></label>
    <div >
            <select className="paiinput"
            value ={gender}
            onChange ={e => setGender(e.target.value)}>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
            </select>
            <div style={{color: "red", fontSize: ".75em"}} >{genderError}</div>
            </div>
  </div>
  <div className="input-box">
    <label  class="details">Doctor's Name <span style={{color:"red"}}>*</span></label><br/>
    
              
            <select className="paiinput"
            value ={doctorName}
            onChange ={e => setDoctorName(e.target.value)}>
               <option value="">Select</option>
               {posts.map((card) => ( 
                <option value={card.Name}>{card.Name}</option>
                ))}
            </select>
           
            <div style={{color: "red", fontSize: ".75em"}} >{doctorNameError}</div>
  </div>
 <br />

  <div class="button">
      <button className="paiinput" onClick={handleSubmit}  type="submit">Submit form</button>
    </div>
    </div>
  
  </form>
  
          </div>
        </div>
        </div>
   
  


      </div>
      ): 
       navigate("/login")
}
      </>
    ); 
  }

export default PaitentInput;


