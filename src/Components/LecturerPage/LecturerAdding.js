import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
//import "./AddingLecturer.css";

const initialLecturer = {
  name: "",
  email: "",
  address: "",
  degree: "",
  mobileNo: "",
  department: "",
  gender: "",
};

function LecturerAdding() {
  const [lecturer, setLecturer] = useState(initialLecturer);
  let { name, email, address, degree, mobileNo, department, gender } = lecturer;
  const navigate = useNavigate();
  const { id } = useParams();

  //Create new Lecturer - Send form data to the Backend
  const addLecturer = async (lecturerData) => {
    await axios
      .post("http://localhost:8080/lecturer", lecturerData)
      .then((res) => {
        window.alert("Lecturer Added Successfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Update existing Lecture record - Send form data to the Backend
  const updateLecturer = async (lecturerData, id) => {
    await axios
      .put(`http://localhost:8080/lecturer/update/${id}`, lecturerData)
      .then((res) => {
        window.alert("Lecturer Details Updated Successfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get Single Lecture By Id
  const getSingleLecturer = async (id) => {
    await axios.get(`http://localhost:8080/lectureById/${id}`).then((res) => {
      setLecturer({ ...res.data });
    });
  };

  useEffect(() => {
    if (id) {
      getSingleLecturer(id);
    }
  }, [id]);

  const handleOnChange = (event) => {
    console.log(event.target.value);
    let { name, value } = event.target;
    setLecturer({ ...lecturer, [name]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(lecturer);
    if (!id) {
      addLecturer(lecturer);
    } else {
      updateLecturer(lecturer, id);
      navigate("/lecturerPage");
    }
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <h3> {id ? "Update Existing Lecturer Record" : "Add New Lecturer"}</h3>
      <div style={{ width: "500px", padding: "30px" }}>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleOnChange}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={handleOnChange}
              value={email}
            />

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="address" className="form-label">
              Permanant Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
              onChange={handleOnChange}
              value={address}
            />
          </div>
          <div className="mb-3">
            <label for="degree" className="form-label">
              Degree
            </label>
            <input
              type="text"
              className="form-control"
              id="degree"
              name="degree"
              onChange={handleOnChange}
              value={degree}
            />
          </div>
          <div className="mb-3">
            <label for="mobileNo" className="form-label">
              Mobile No:
            </label>
            <input
              type="Number"
              className="form-control"
              id="mobileNo"
              name="mobileNo"
              onChange={handleOnChange}
              value={mobileNo}
            />
          </div>
          <div className="mb-3">
            <label for="department" className="form-label">
              Department:
            </label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              onChange={handleOnChange}
              value={department}
            />
          </div>
          <div className="mb-3">
            <label for="gender" className="form-label">
              Gender:
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              type="text"
              className="form-control"
              name="gender"
              id="gender"
              onChange={handleOnChange}
              value={gender}
            >
              <option selected>Select the Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LecturerAdding;
