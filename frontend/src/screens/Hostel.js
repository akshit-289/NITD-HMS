import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
const BASE_URL = "https://nitd-hostel-management-system.onrender.com";
function Hostel() {
    const [dhauladhar, setDhauladhar] = useState([]);

    const addFloor = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/addfloor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setWallHeight(33 * dhauladhar.length);
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Floor not added");
        }
        else {
            alert("Floor added");
            // window.location.reload();
        }
    }

    const loadData = async () => {
        let response = await fetch(`${BASE_URL}/api/dhauladhar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        setDhauladhar(response);
    }  
    useEffect(()=>{
        loadData();
    }, []);
    console.log(dhauladhar);
    
    const [wallHeight, setWallHeight] = useState(33*dhauladhar.length);

    return (
        <div style={{"textAlign":"center"}}>
            <div className='hostel'>
                <div className="house">
                    <div className="roof"></div>
                    <div className="wall" style={{"height": `${wallHeight}px`}}>
                        {dhauladhar.map((e, index) => {
                            var str = `/floor/${dhauladhar.length - index}`;
                            return (<Link to={str} className='flr btn'>{dhauladhar.length - index} Floor</Link>)
                        })}
                    </div>
                </div>
            </div>
            <button type="button" className='btn btn-primary' onClick={addFloor}>Add a Floor</button>
        </div>
    )
}

export default Hostel
