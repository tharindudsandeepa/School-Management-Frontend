import axios from 'axios'
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddModule() {

    let navigate=useNavigate()
    const [module,setModule]=useState({
        moduleCode:"",
        moduleName:"",
        moduleStartDate:"",
        course:""
    })

    const {moduleCode,moduleName,moduleStartDate,course}=module

    const onInputChange=(e)=>{
        setModule({...module,[e.target.name]:e.target.value})

    }

    const  onSubmit= async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/addModule",module)
                    .then((res)=>{
                        window.alert("Module added Successfully");
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
        navigate("/module");
    }

  return (
    <div className="container">
        <div className="conatainer">
            <div className="row">
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add New Module</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='moduleCode' className='form-label'>
                            Module Code
                        </label>
                        <input type={"text"}
                        className="form-control"
                        placeholder='Enter Module Code'
                        name="modulecode"
                        defaultvalue={moduleCode}
                        onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='courseCode' className='form-label'>
                            Module Name
                        </label>
                        <input type={"text"}
                        className="form-control"
                        placeholder='Enter Module Name'
                        name="modulename"
                        defaultvalue={moduleName}
                        onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='courseCode' className='form-label'>
                            Start Date
                        </label>
                        <input type={"date"}
                        className="form-control"
                        placeholder='Enter Start Date of the Module'
                        name="startdate"
                        defaultvalue={moduleStartDate}
                        onChange={(e)=>onInputChange(e)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='courseCode' className='form-label'>
                            Course
                        </label>
                        <input type={"text"}
                        className="form-control"
                        placeholder='Enter Course Name'
                        name="course" 
                        defaultvalue={course}
                        onChange={(e)=>onInputChange(e)}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to={"/module"}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
