import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import Loading from "../components/Loading";

function StudentCreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [inputErrorList, setInputErrorList] = useState({})
    const [student, setStudent] = useState({
        student_id: '',
        fullname: '',
        email: ''
    })

    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const saveStudent = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            student_id: student.student_id,
            fullname: student.fullname,
            email: student.email
        }

        axios.post(`http://127.0.0.1:8000/api/students`, data).then(res => {
            alert(res.data.message);
            navigate('/students');
            setLoading(false);
        })
        .catch(function (error) {
            if(error.response) {
                if(error.response.status === 422) {
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                if(error.response.status === 500) {
                    alert(error.response.data)
                    setLoading(false);
                }
            }
        });
    }

    if(loading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Student
                            <Link to="/students" className="btn btn-danger float-end">
                                Back
                            </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent}>
                                <div className="mb-3">
                                    <label>Student ID</label>
                                    <input type="number" name="student_id" value={student.student_id} onChange={handleInput} className="form-control"></input>
                                    <span className="text-danger">{inputErrorList.student_id}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Full Name</label>
                                    <input type="text" name="fullname" value={student.fullname} onChange={handleInput} className="form-control"></input>
                                    <span className="text-danger">{inputErrorList.fullname}</span>
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" value={student.email} onChange={handleInput} className="form-control"></input>
                                    <span className="text-danger">{inputErrorList.email}</span>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Save Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentCreate;