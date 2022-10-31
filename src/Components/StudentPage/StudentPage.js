import {useState, useEffect,React} from 'react';
import axios from "axios";
import './StudentPage.css';
import { toast } from 'react-toastify';

export default function StudentPage() {

    
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showStudents, setShowStudents] = useState(false);
    const [addStudent, setAddStudent] = useState(false);
    const [updateStudent, setUpdateStudent] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [id, setStudentId] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [course, setCourse] = useState("");
    
    const resetForm = ()=>{
        
        setFirstName("");
        setLastName("");
        setAddress("");
        setDob("");
        setCourse("");
    }
     
    const handleDelete = async (id) => {
        const url = `http://localhost:8080/delete/${id}` ; 
        await axios
        .delete(url)
        .then((data) => {
            if(data.status === 200 ) {
                toast.error("Student Deleted Successfully...");
                getStudents();
            }
          
        })
        .catch((err) => {
          console.log(err);
        });
    } 

    // const getStudentByName =async (e) =>{
    //     e.preventDefault();

    //     const url = `http://localhost:8080/student/${studentName}`;

    //     await axios
    //     .get(url)
    //     .then(data => {
    //         setStudents(data.data);
    //     })
    // }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const student = {firstName,lastName,address,dob,course}
        await fetch("http://localhost:8080/addStudent",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        })
        .then( (response) => {
          //handle success
              if(response.status == 200){
                toast.success("Student Added Successfully...") ;     
                resetForm();
                setAddStudent(!addStudent);
                
              }
        }).catch((err)=>{
            // handle error
            console.log(err);    
        });
    }

    const handleUpdate =async (sid) =>{
        setStudentId(sid);
        const url = `http://localhost:8080/studentById/${sid}`;
        await axios
        .get(url)
        .then((data) => {
            setFirstName(data.data.firstName);
            setLastName(data.data.lastName);
            setAddress(data.data.address);
            setDob(data.data.dob);
            setCourse(data.data.course);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const updateDetails = async  (e)=>{
        e.preventDefault();
        console.log(id);
        const updateUrl = `http://localhost:8080/update`;
        const student = {id,firstName,lastName,address,dob,course}
        console.log(JSON.stringify(student));
        await fetch(updateUrl,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        })
        .then( (response) => {
          //handle success
              if(response.status == 200){
                toast.success("Student Updated Successfully...") ;    
                getStudents();
                resetForm(); 
                setUpdateStudent(!updateStudent);
              }
        }).catch((err)=>{
            // handle error
            console.log(err);    
        });
    }

    const getStudents = () =>{
        setLoading(true);

        const url = 'http://localhost:8080/students' ; 

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setStudents(data);
            setLoading(false);
        })
    }

    
    if (loading) {
        return <p>Loading...</p>;
    }

  return (
    <section className='mainSection d-flex align-items-center justify-content-center p-5'>
        <div className='entireContainer'>

            <div className='text-center p-4 subContainers'>
                <h4>Add New Student</h4>
                <button className='btn btn-lg btn-primary' onClick={ ()=> {
                            setAddStudent(!addStudent);
                } } >
                            { addStudent === true ? 'Hide Form':'Add Student'}
                </button>

                { addStudent && (
                                <form>
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="firstName">First Name : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='firstName' value={firstName} onChange={ (e)=>setFirstName(e.target.value)} placeholder='Student First Name Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="lastName">Last Name : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='lastName' value={lastName} onChange={ (e)=>setLastName(e.target.value)} placeholder='Student Last Name Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="address">Student Address : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='address' value={address} onChange={ (e)=>setAddress(e.target.value)} placeholder='Student Address Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="dob">Student DOB : <span className='required-field'> *</span></label>
                                    <input type="date" className="form-control" name='dob' value={dob} onChange={ (e)=>setDob(e.target.value)}placeholder='Student DOB Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="course">Student Course : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='course' value={course} onChange={ (e)=>setCourse(e.target.value)} placeholder='Student Course Here'/>
                                </div>
                                
                                <div className="pt-2">
                                    <button className="btn btn-primary btn-lg btn-block" onClick={handleSubmit} >Add Student</button>
                                    <button className="btn btn-danger btn-lg btn-block mx-5" onClick={resetForm}>Reset</button>
                                </div>
                            </form>
                                )}
               
            </div>

            <div className='subContainers'>
                <div className='text-center p-4'>
                    <h4>View Students</h4>
                        <button className='btn btn-lg btn-primary' onClick={ ()=> {
                            setShowStudents(!showStudents);
                            getStudents();
                        } } >
                            { showStudents === true ? 'Hide Students' : 'Show Students'}
                        </button>
                </div>
                { showStudents && (
                    <div className='studentTable p-2'>
                    <table className="table table-striped">
                    <thead className="bg-primary text-white">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Course</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody> 
                    
                        {
                            students.map(student => {
                                return (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>    
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.address}</td>
                                        <td>{student.dob}</td>
                                        <td>{student.course}</td> 
                                        <td>
                                            <a className="btn btn-sm btn-primary m-1" onClick={ ()=>{ handleUpdate(student.id) ; setUpdateStudent(!updateStudent); }}>Update</a>
                                            <a className="btn btn-sm btn-danger" onClick={ ()=> { handleDelete(student.id)}}>Delete</a>
                                        </td>       
                                    </tr>    
                                )
                            }  )
                        }
                    </tbody> 
                    </table>
                </div>
                )}
            </div>

            {
                updateStudent && (
                    <div className='subContainers'>
                        <div className='text-center p-4'>
                            <h4>Update Student</h4>
                            <form>
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="firstName">First Name : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='firstName' value={firstName} onChange={ (e)=>setFirstName(e.target.value)} placeholder='Student First Name Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="lastName">Last Name : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='lastName' value={lastName} onChange={ (e)=>setLastName(e.target.value)} placeholder='Student Last Name Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="address">Student Address : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='address' value={address} onChange={ (e)=>setAddress(e.target.value)} placeholder='Student Address Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="dob">Student DOB : <span className='required-field'> *</span></label>
                                    <input type="date" className="form-control" name='dob' value={dob} onChange={ (e)=>setDob(e.target.value)}placeholder='Student DOB Here'/>
                                </div>
            
                                <div className="mb-2"> 
                                    <label className="form-label fw-bold" htmlFor="course">Student Course : <span className='required-field'> *</span></label>
                                    <input type="text" className="form-control" name='course' value={course} onChange={ (e)=>setCourse(e.target.value)} placeholder='Student Course Here'/>
                                </div>
                                
                                <div className="pt-2">
                                    <button className="btn btn-primary btn-lg btn-block" onClick={updateDetails} >Update Student</button>
                                    <button className="btn btn-danger btn-lg btn-block mx-5" onClick={resetForm}>Reset</button>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                )
            }
        </div>
        
    </section>
  )  
}

