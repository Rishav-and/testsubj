import React, {useEffect, useState} from "react";

import { useParams,useNavigate } from "react-router-dom";
import { db } from "./Firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faLock} from '@fortawesome/free-solid-svg-icons'


function Detail (props) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts]= useState([]);
    
    const {user} = props;
    const { id,  } = useParams();
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
    
    if(loading){
        return <h1> Loading Firebase data....</h1>;
    }

    return (
        <>
        {user? (
    <div >

       
            {posts.filter(card => card.id === id, user).map((card,index) => (
                <div >
                    
                    <div className="bg-light " >
           <div className="container ">
               <div className="row d-flex justify-content-center">
                   <div className="col-md-10 mt-5 mb-5 pb-5 pt-5">
                       <div  className="row shadow ">
                           <div  className="col-sm-4 bg-primary rounded-start">
                               <div style={{marginTop:"40%"}} className="card-block text-center text-white ">
                               <FontAwesomeIcon className="fas fa-7x mt-5" icon={faUser} />
                               <h1 className="font-weight-bold mt-4">{card.name}</h1>
                               <p style={{fontSize:"1.5rem"}}>{card.date}</p>
                              </div>
                           </div> 
                           
                           <div className="col-sm-8 bg-white rounded-end">
                               <h2 className="mt-3 ">Information</h2>
                               <hr className="bg-info mt-0 w-50" />
                                   <div className="row">
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">City</p>
                                           <h5 className="text-muted">{card.city}</h5>
                                       </div>
                                       
                                           
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Address</p>
                                           <h5 className="text-muted">{card.address}</h5>
                                       </div>
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Email</p>
                                           <h5 className="text-muted">{card.emial}</h5>
                                       </div>
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Whatsapp:</p>
                                           <h5 className="text-muted">{card.whatsapp}</h5>
                                       </div>
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Gender</p>
                                           <h5 className="text-muted">{card.gender}</h5>
                                       </div>
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Age</p>
                                           <h5 className="text-muted">{card.age}</h5>
                                       </div>
                                       <div className="col-sm-12">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Detail</p>
                                           <h5 className="text-muted">{card.detail}</h5>
                                       </div>
                                   </div>
                                <h2 className="mt-3">Hospital's Detail</h2>
                               <hr className="bg-info  mt-0 w-50" />
                               <div className="row">
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Center</p>
                                           <h5 className="text-muted">{card.center}</h5>
                                       </div>
                                       <div className="col-sm-6">
                                           <p style={{fontSize:"1.35rem"}} className="font-weight-bold">Doctor</p>
                                           <h5 className="text-muted">{card.doctorName}</h5>
                                       </div>
                                   </div>
                           </div>
                       </div>
                       </div>
               </div>
           </div>
       </div>
                </div>
            ))}
          
       
     </div>
     ):(
        navigate("/login") 
      

)}
              
        </>
    )
}

export default Detail;