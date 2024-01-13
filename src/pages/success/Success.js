import React from 'react'
import {Link} from 'react-router-dom'

//styles
import './Success.css'

export default function Success() {
  return (
    <div className="success">
      <h1>Purchase was successful</h1>
      <div>
        <p>We will contact you inquiring about delivery within the next couple days. You should have also recieved an email confirming your order. Thank you for shopping with Ryans Meats. </p>
      </div>
      
      <Link to="/" className="btn" id="goB"> Go Back Home</Link>
    </div>
  )
}
