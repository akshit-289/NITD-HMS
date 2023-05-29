import React from 'react'
import {Link} from "react-router-dom";

function Card(props) {

  return (
    <div>
          <div className="card m-4" style={{width: "18rem"}}>
              <img className="card-img-top" alt="..." style={{height:"150px",objectFit:"fill"}} src={props.img} />
                  <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                      <p className="card-text"></p>
                      <Link to="/hostel" className="btn btn-primary">{props.name} Hostel</Link>
                  </div>
          </div>     
    </div>
  )
}

export default Card
