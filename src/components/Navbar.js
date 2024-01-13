import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCheckoutContext } from '../hooks/useCheckoutContext'
import { useLogout } from '../hooks/useLogout'
import CheckoutSlider from './CheckoutSlider'
import logo from '../images/logoB.png'

// styles
import "./Navbar.css"


export default function Navbar() {
  const { user } = useAuthContext()
  const { items, showCheckout } = useCheckoutContext()
  const {logout, error, isPending} = useLogout()
  const [cart, setCart] = useState(true)
  const location = useLocation()

useEffect(() => {
  setCart(showCheckout)
  
}, [items.length]);

  return (
    <div className="navbar">
        <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
        {user && (
          <>
            {!isPending && <span className="btn" onClick={logout}>Logout</span>}
            {isPending && <span>Loading</span>}
          </>
        )}
            
          <ul className="links">
            {location.pathname != "/aboutus" &&<li><Link to="/aboutus" className="btn2">About Us</Link></li>}
            {location.pathname == "/aboutus" &&<li><Link to="/aboutus" className=" curr btn2">About Us</Link></li>}
            {location.pathname != "/faq" &&<li><Link to="/faq" className="btn2">FAQ</Link></li>}
            {location.pathname == "/faq" &&<li><Link to="/aboutus" className="btn2 curr">FAQ</Link></li>}
            {location.pathname != "/shop" &&<li><Link to="/shop" className="btn2">Shop Now</Link></li>}
            {location.pathname == "/shop" &&<li><Link to="/aboutus" className="btn2 curr">Shop Now</Link></li>}
            {items.length > 0 && 
            <li className="viewCartShortCont">
               <button onClick={()=> setCart(true)} className="viewCartShort">Checkout</button>
                {(cart && items.length > 0) && <CheckoutSlider setCart= {setCart} showDel={true}/>}
            </li>}
          </ul>


          {items.length > 0 && <button onClick={()=> setCart(true)} className="viewCartLong">{items.length} Item <br/>In Cart</button>}
          {(cart && items.length > 0) && <CheckoutSlider setCart= {setCart}/>}
        
          

        {error && <p className='error'>{error}</p>}


      
    </div>
  )
}
