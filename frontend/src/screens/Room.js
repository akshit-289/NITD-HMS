import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const BASE_URL = "https://nitd-hostel-management-system.onrender.com";

export default function Room() {
    const [stud, setStud] = useState([]);
    const [updForm, setUpdForm] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const param = useParams();
    const [credentials, setCredentials] = useState({
        name: "",
        rollno: ""
    })
    const [studentID, setStudentId] = useState("");
    const floor = Number(param.floor) + 1;
    const roomNo = (Number(param.floor) + 1) * 100 + Number(param.room) + 1;
    const loadData = async () => {
        let response = await fetch(`${BASE_URL}/api/dhauladhar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setStud(response[param.floor].rooms[param.room].students);
    }

    const handleDel = async (props) => {
        const response = await fetch(`${BASE_URL}/api/delStudent/${props.fl}/${props.ro}/${props.studID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Task incomplete");
        }
        else {
            alert("Student's details Deleted");
            // window.location.reload();
        }
    }

    const handleUpd = async (e) => {
        e.preventDefault();
        setUpdForm(false);
        const response = await fetch(`${BASE_URL}/api/updStudent/${param.floor}/${param.room}/${studentID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, rollno: credentials.rollno })
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
        else {
            alert("Student's details Updated");
            // window.location.reload();
        }
    }

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const addStudent = async (e) => {
        e.preventDefault();
        setAddForm(false);
        console.log(floor + " " + roomNo);
        const response = await fetch(`${BASE_URL}/api/updfloor/${floor}/${roomNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, rollno: credentials.rollno })
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
        else {
            alert("Student's details added");
            // window.location.reload();
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='justify-content-center' style={{ "textAlign": "center" }}>
            <div className="card m-4 justify-content-center">
                <h1>Room Number : {roomNo}</h1>
                <div className="card-body">
                    <div className='justify-content-center' style={{ "textAlign": "center" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll No.</th>
                                    <th>Modify</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {stud.map((e, index) => {
                                const props = {
                                    fl: param.floor,
                                    ro: param.room,
                                    studID: e._id
                                }
                                return (
                                        <tr key={index}>
                                            <td>{e.name}</td>
                                            <td>{e.rollno}</td>
                                            <td>
                                                <button onClick={
                                                    () => {
                                                        setStudentId(props.studID);
                                                        setUpdForm(!updForm);
                                                    }
                                                } className="btn btn-primary mx-2 ms-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                                    </svg></button>
                                            </td>
                                            <td>
                                                <button onClick={() => { handleDel(props) }} className='btn btn-danger mx-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg></button>
                                            </td>
                                        </tr>
                                )
                            })}
                        </table>
                    </div>
                    <button style={{"margin-top": "10px"}} onClick={() => { setAddForm(!addForm) }}>Add a Student</button>
                    {addForm && <div className='container'>
                        <form>
                            <div className="form-group p-2">
                                <input type="text" className="form-control" placeholder="Enter Name of New Student" name="name" value={credentials.name} onChange={handleChange} />
                            </div>
                            <div className="form-group p-2">
                                <input type="text" className="form-control" placeholder="Enter Roll Number of New Student" name="rollno" value={credentials.rollno} onChange={handleChange} />
                            </div>
                            <div className='form-group p-2'>
                                <button type="submit" className="btn btn-primary" onClick={addStudent}>Submit</button>
                            </div>
                        </form>
                    </div>}
                    {updForm && <div className='container'>
                        <form>
                            <div className="form-group p-2">
                                <input type="text" className="form-control" placeholder="Enter Updated Name" name="name" value={credentials.name} onChange={handleChange} />
                            </div>
                            <div className="form-group p-2">
                                <input type="text" className="form-control" placeholder="Enter Updated Roll Number" name="rollno" value={credentials.rollno} onChange={handleChange} />
                            </div>
                            <div className='form-group p-2'>
                                <button type="submit" className="btn btn-primary" onClick={handleUpd}>Submit</button>
                            </div>
                        </form>
                    </div>}
                </div>
            </div>
        </div>
    )
}
