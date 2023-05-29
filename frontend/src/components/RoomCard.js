import React from 'react'
import {Link} from 'react-router-dom'

export default function Room(props) {
    const str = `/room/${Math.round(props.number/100)-1}/${(props.number % 100) - 1}`
    return (
        <div>
            <div className="card m-4" style={{"width": "18rem;", "border":"3px solid black"}}>
                    <div className="card-body">
                        <h5 className="card-title">Room Number - {props.number}</h5>
                        <p className="card-text"></p>
                        <Link to={str} className="btn btn-primary">View Details</Link>
                    </div>
            </div>
        </div>
    )
}
