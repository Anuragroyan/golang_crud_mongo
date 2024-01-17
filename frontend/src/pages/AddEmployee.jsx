import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

export default function AddEmployee() {
     const navigate = useNavigate()
     const [data, setData] = useState({
          name:"",
          email:"",
          phone:"",
          designation:"",
          salary:""
     })
     const handleInput = (e) => {
          const name=e.target.name
          const value=e.target.value
          setData({...data, [name]: value})
     }
     const handleSubmit = async (e) => {
          e.preventDefault()
          const {name, email, phone, designation, salary} = data
          const res = await fetch("http://localhost:8000/api/employees",{
               method:"POST",
               headers:{
                    "Content-Type":"application/json"
               },
               body: JSON.stringify({name, email, phone, designation, salary})
          })
          const body = await res.json()
          console.log(body)
          navigate("/")
     }

     return(
          <div>
               <Navbar/>
             <div className="container">
             <h1 className="text-center">Add User</h1>
             <form onSubmit={handleSubmit}>
               <div className="mb-3">
                    <label htmlFor="name" className="form-lable">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={handleInput} /> 
               </div>
               <div className="mb-3">
                    <label htmlFor="email" className="form-lable">Email</label>
                    <input type="text" className="form-control" name="email" id="email"  onChange={handleInput} /> 
               </div>
               <div className="mb-3">
                    <label htmlFor="phone" className="form-lable">Phone</label>
                    <input type="text" className="form-control" name="phone" id="phone"  onChange={handleInput} /> 
               </div>
               <div className="mb-3">
                    <label htmlFor="designation" className="form-lable">Designation</label>
                    <input type="text" className="form-control" name="designation" id="designation"  onChange={handleInput} /> 
               </div>
               <div className="mb-3">
                    <label htmlFor="salary" className="form-lable">Salary</label>
                    <input type="text" className="form-control" name="salary" id="salary"  onChange={handleInput} /> 
               </div>
               <button type="submit" className="btn btn-primary w-100">Submit</button>
             </form>
          </div>
          </div>
     )
}