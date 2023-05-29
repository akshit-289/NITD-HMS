import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='fs-2 mt-3' style={{width:"50%", margin:"auto", textAlign:"center"}}>
          Hostels
      </div>
      <div className='d-flex justify-content-center'>
        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfAi2xec6acdNVMvqWInvgWk2rTOkzWpYOdA&usqp=CAU" name="Dhauladhar" title="Dhauladhar Hostel" />
        <Card img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfAi2xec6acdNVMvqWInvgWk2rTOkzWpYOdA&usqp=CAU" name="Yamuna" title="Yamuna Hostel" />
      </div>
      <Footer />
    </div>
  )
}

export default Home
