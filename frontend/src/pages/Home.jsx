import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
     const [data, setData] = useState([])
     const  callAPI = async () => {
        const res = await fetch('http://localhost:8000/api/employees')
        const body = await res.json()
        console.log(body)
        setData(body)
     }
     const handleDelete = (id) => {
          return async () => {
               const res = await fetch(`http://localhost:8000/api/employees/${id}`,{
                   method:'DELETE' 
               })
               const body = await res.json()
               console.log(body)
               callAPI()
          }
     }

     useEffect(()=>{
          callAPI()
     },[])
     return(
          <div>
               <Navbar/>
               <div className="container">
                   <table className="table">
                      <thead>
                         <tr>
                            <th scope="col">#</th>  
                            <th scope="col">NAME</th>  
                            <th scope="col">EMAIL</th>  
                            <th scope="col">PHONE NUMBER</th>  
                            <th scope="col">DESIGNATION</th>
                            <th scope="col" >SALARY</th>    
                         </tr>
                      </thead>
                      <tbody>
                         {data!=null && data.map((item, index)=>(
                              <tr key={index}>
                              <th scope="row">{item._id}</th>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>{item.designation}</td>
                              <td>{item.salary}</td>
                              <td>
                                   <a href={`/update/${item._id}`} className="btn btn-warning me-3">Update</a>
                                   <button type="button" className="btn btn-danger" onClick={handleDelete(item._id)}>Delete</button>
                              </td>
                              </tr>
                         ))}
                      </tbody>
                    </table> 
               </div>
          </div>
     ) 
}