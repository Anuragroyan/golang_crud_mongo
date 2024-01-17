import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function UpdateEmployee() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [data, setData] = useState({
      name: "",
      email:"",
      phone:"",
      designation:"",
      salary:""
    }) 
    const callAPI = async () => {
     const res = await fetch(`http://localhost:8000/api/employees/${id}`);
     const body = await res.json()
     setData(body)
     console.log(body)
    }
    useEffect(()=>{
     callAPI()
    }, [])
    const handleInput = (e) => {
     const name=e.target.name
     const value=e.target.value
     setData({...data, [name]: value})
    }
    const handleSubmit = async (e) => {
     e.preventDefault()
     const { phone, designation, salary } = data
     const res = await fetch(`http://localhost:8000/api/employees/${id}`, {
          method:"PUT",
          headers: {
               "Content-Type":"application/json",
          },
          body: JSON.stringify({phone, designation, salary})
     }) 
     console.log(res.json())
     navigate("/")
    }

    return(  
     <div>
          <Navbar/>
          <div className="container">
               <h1 className="text-center">Update the Employee {data.name}</h1>
               <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                         <label htmlFor="phone" className="form-lable">Phone Number</label>
                         <input type="text" className="form-control" name="phone" id="phone" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="designation" className="form-lable">Designation</label>
                         <input type="text" className="form-control" name="phone" id="phone" onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="salary" className="form-lable">Salary</label>
                         <input type="text" className="form-control" name="salary" id="salary" onChange={handleInput} />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Submit</button>
               </form>
          </div>
     </div>
    ) 
}