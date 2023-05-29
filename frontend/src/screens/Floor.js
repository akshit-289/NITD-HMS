import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Room from "../components/RoomCard";

export default function Floor() {
    const [rooms, setRooms] = useState([]);
    const param = useParams();

    const addRoom = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/addroom/${param.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Room not added");
        }
        else {
            alert("Room added");
            window.location.reload();
        }
    }

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/dhauladhar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setRooms(response[param.id-1].rooms);
    }
    useEffect(()=>{
        loadData();
    }, []);
    console.log(rooms);
    return (
        <div className='justify-content-center' style={{"textAlign":"center"}}>
            <h1>Floor {param.id}</h1>
            <div style={{"display":"flex"}} className='m-2'>
                {rooms.map((e, index) => {
                    return (<Room key={index} number={100 * (param.id) + index + 1} />)
                })}
            </div>
            <div className='container justify-content-center'>
                <button className='btn btn-primary mx-2' onClick={addRoom}>Add a Room</button>
            </div>
        </div>
    )
}

