import {useState, useEffect,React} from 'react';
import axios from "axios";
import { render } from 'react-dom';
import userEvent from '@testing-library/user-event';
import { Link, useParams } from 'react-router-dom'


export default function ModulePage() {

    const [modules,setModules]=useState([]);

    const {id}=useParams()

    useEffect(()=>{
        loadModules();
    },[]);

    const loadModules=async()=>{
        const result=await axios.get("http://localhost:8080/modules");
        setModules(result.data);
    }
    const deleteModule=async (id)=>{
        await axios.delete(`http://localhost:8080/modules/${id}`)
        loadModules()
    }

  return (
    <div className='modulePage'>
        <div className='upperPart'>
            <h4>Modules List</h4>

            <Link className='btn btn-outline-primary mx-2 my-2' to={"/addModule"}>Add New Module</Link>
        </div>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                        <th scope="col">Module Code</th>
                        <th scope="col">Module Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Course</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        modules.map((module,index)=>(
                            <tr>
                                
                                <td>{module.moduleCode}</td>
                                <td>{module.moduleName}</td>
                                <td>{module.moduleStartDate}</td>
                                <td>{module.course}</td>
                                <button  className='btn btn-outline-danger mx-2 my-2' 
                                onClick={()=>deleteModule(module.id)}
                                >Delete</button>
                            </tr>
                        ))
                    }
                    
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}
