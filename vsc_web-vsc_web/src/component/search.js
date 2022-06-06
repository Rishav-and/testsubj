import { useState, useEffect } from "react";
import React from "react";
import { db } from "./Firebase";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,  faSearch} from '@fortawesome/free-solid-svg-icons';


import { ExportCSV } from "./export";


function Search (props) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts]= useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const {user} = props;
    const navigate = useNavigate();

  

    useEffect(() => {
        const getPosts = [];
        const details = db
        .collection("PaitentDetail")
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach((doc)=> {
              getPosts.push({
                  ...doc.data(),
                  key: doc.id,
              });
       
            });
            setPosts(getPosts);
            setLoading(false); 
              
        });
        return () => details();
      
    }, []);
    // const headers = [
    //     {label: "Name of Paitent", key:posts.name },
    //     {label: "Date", key:posts.Date },
    //     {label: "Email", key:posts.email },
    //     {label: "City", key:posts.city },
    //     {label: "Center Admited", key:posts.center },
    //     {label: "Address", key:posts.address },
    //     {label: "Detail", key:posts.detail },
    //     {label: "Whatsapp", key:posts.whatsapp },
    //     {label: "Age", key:posts.age },
    //     {label: "Gender", key:posts.gender },
    //     {label: "Doctor Assigned", key:posts.doctorName }
    // ]

    // const csvReport = {
    //     filename: "Paitent's Detail.csv",
    //     headers: headers,
    //     data: {posts}
    // };

  


    if(loading){
        return <h1> Loading Firebase data....</h1>;
    }

   

    return(
        <>
        {user? (
        
        <div>
        
        <div className="container bg-light ">
        <div className="row gy-5 gx-5">
            <div className="searchBox">
        <input 
         type="text" className="searchbox"
         placeholder="Search..."
         onChange={(event) => {
             setSearchTerm(event.target.value);
         }} />
          &nbsp; &nbsp;
            <label htmlFor="checkdate">
              <strong>Start Date</strong>
            </label>
           <input
              type="date"
              id="startdate"
              
            />
             &nbsp; &nbsp;
            <label htmlFor="checkdate">
              <strong>End Date</strong>
            </label>
            
            <input
              type="date"
              
              id="startdate"
              
            />
           {/* <ExportCSV csvData={posts} fileName= "Xl" buttonText="export"/>
          */}
          <FontAwesomeIcon style={{color:"#4d74fb" ,height:"1.35rem"}} className="ms-2" icon={faSearch} />
         
             </div>

         {posts.length > 0 ? (

             posts.filter((val) => {
                 if (searchTerm =="") {
                     return val
                 } else  if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                     return val
                 } else if (val.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }

             }).map((post) => 
             <div   key={post.key} className="col-md-4 mb-4 "> 
             
             <div style={{ cursor:"pointer"}} onClick={() => {navigate("/search/"+post.id) }} className="card  ms-3 me-3 rounded hoverCss " >
             
                     
                    <div className="bg-primary card-img-top   ">
                               <div className=" text-center text-white ">
                               <FontAwesomeIcon className="fas fa-7x mt-4 mb-4 " icon={faUser} />
                               
                              </div>
                           </div> 
                           <div className="bg-light  rounded pb-3 pt-3">
                           <h3 className="text-center">{post.name}</h3>
                           <h3 className="text-center">{post.date}</h3>
                           <h3 className="text-center">{post.doctorName}</h3>
                           
                           </div>
                          
                           
                  
             </div>
             </div>
            
             )
         ):<h1>no post till date</h1>}
         </div>
        
                  
         
            </div>
             </div>
             ):(
        navigate("/login") 

)}
        </>
    );
}

export default Search;

