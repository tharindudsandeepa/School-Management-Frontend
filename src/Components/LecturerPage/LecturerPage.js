import React from "react";
import { Link } from "react-router-dom";
import LecturerAdding from "./LecturerAdding";
import Lecturers from "./Lecturers";
import lecture from "../../Assets/Lecturer.jpg";

function LecturerPage() {
  return (
    <div>
      <div class="container text-center">
        <div class="row g-2">
          <div class="col-6">
            <div class="p-3 border bg-light">
              <div class="container text-center">
                <div class="row row-cols-1">
                  <div class="row">
                    <div class="col-md-6 offset-md-3">
                      <h1 style={{ paddingTop: "95px", paddingBottom: "35px" }}>
                        LECTURERS MANAGEMENT
                      </h1>

                      <Link to={`/lecturer/department`}>
                        <button type="button" class="btn btn-success">
                          Department
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div class="col">
                    {" "}
                    <img width="100%" src={lecture} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 border bg-light">
              <LecturerAdding />
            </div>
          </div>
          <div class="col-12">
            <div class="p-3 border bg-light">
              {" "}
              <Lecturers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerPage;
