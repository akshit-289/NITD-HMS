import React from 'react'
import { Link } from "react-router-dom"
function Navbar() {
  return (
      <div>
          {/* <div className='fs-1 mx-10' style={{"text-align": "center"}}></div> */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-success">
              <div className="container-fluid mx-10">
                  <Link className="navbar-brand fs-1 fst-italic" to="/">NIT Delhi Hostel Management System</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                          <Link className="nav-link" to="/login">Login</Link>
                          <Link className="nav-link" to="/signup">Register</Link>
                      </div>
                  </div>
              </div>
          </nav>
      </div>
  )
}

export default Navbar
