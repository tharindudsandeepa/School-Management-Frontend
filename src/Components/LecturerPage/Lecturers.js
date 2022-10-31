import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Lecturers() {
  const [lecturers, setLecturers] = useState([]);

  //Get All Lecturers
  const getLecturer = async () => {
    await axios
      .get(`http://localhost:8080/lecturer`)
      .then((res) => {
        console.log(res);
        setLecturers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete lecturer By Id
  const onDeleteLecturer = async (id) => {
    if (
      window.confirm(
        "Are you sure that you wanted to delete this Lecturer record."
      )
    ) {
      await axios
        .delete(`http://localhost:8080/lecturer/${id}`)
        .then((res) => {
          window.alert("Lecturer Record has been deleted Successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getLecturer();
  }, []);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h4>LECTURERS</h4>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile No</th>
            <th scope="col">Degree</th>
            <th scope="col">Department</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "13px" }}>
          {lecturers &&
            lecturers.map((lecturer, index) => {
              return (
                <tr key={index}>
                  <td>{lecturer.name}</td>
                  <td>{lecturer.email}</td>
                  <td>{lecturer.address}</td>
                  <td>{lecturer.mobileNo}</td>
                  <td>{lecturer.degree}</td>
                  <td>{lecturer.department}</td>
                  <td>{lecturer.gender}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        onDeleteLecturer(lecturer.id);
                      }}
                    >
                      Delete
                    </button>{" "}
                    <Link to={`/lecturer/update/${lecturer.id}`}>
                      <button type="button" className="btn btn-info btn-sm">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Lecturers;
