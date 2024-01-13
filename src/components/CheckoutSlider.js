
import React, {useEffect, useState} from 'react'
import { useCheckoutContext } from '../hooks/useCheckoutContext'
import { Link } from 'react-router-dom'


import CheckoutList from './CheckoutList'

//styles
import "./CheckoutSlider.css"

export default function CheckoutSlider({setCart}) {
    const { items, closeCheckout } = useCheckoutContext()
    const [total, setTotal] = useState(0)
    const [line, setLine] = useState([])
    const handleClose = (e)=>{
      setCart(false)
    }
    useEffect(() => {
      if (items.length === 0){
        setCart(false)
      }
      closeCheckout()
    }, [items]);
    useEffect(()=>{
      let itTotal = 0;
      let line_items = []
      items.forEach((item)=>{
        itTotal+= parseFloat(item.price) * parseFloat(item.quantity)

        line_items.push({
          quantity: item.quantity,
          price_data: {
            currency: "cad",
            unit_amount: (Math.round(item.price * 100)),
            product_data: {
              name: item.name,
            }
          }
        })
        
      })
      setLine(line_items);
      setTotal(itTotal)
    },[items.length])


  return (
    <div className='checkoutSlider'>
        <button onClick={handleClose} className="btn" id="closeSlider"> close slider</button>
        <h3>Checkout</h3>
        <CheckoutList items = {items} showDel = {true} isSlider={true}/>
        <p className='total'>Total: {Math.round(total*100)/100}$</p>
        <Link to='/checkout' className='btn' id="checkout"onClick = {handleClose}>Checkout</Link>

    </div>
  )
}

// CHECKOUT WITH STRIPE

// import React, {useEffect, useState} from 'react'
// import { useCheckoutContext } from '../hooks/useCheckoutContext'
// import { functions } from '../firebase/config'
// import { httpsCallable } from 'firebase/functions'
// import {loadStripe} from '@stripe/stripe-js'


// import CheckoutList from './CheckoutList'

// //styles
// import "./CheckoutSlider.css"

// export default function CheckoutSlider({setCart}) {
//     const { items, closeCheckout } = useCheckoutContext()
//     const [total, setTotal] = useState(0)
//     const [line, setLine] = useState([])
//     const handleClose = (e)=>{
//       setCart(false)
//     }
//     useEffect(() => {
//       if (items.length === 0){
//         setCart(false)
//       }
//       closeCheckout()
//     }, [items]);
//     useEffect(()=>{
//       let itTotal = 0;
//       let line_items = []
//       items.forEach((item)=>{
//         itTotal+= parseFloat(item.price) * parseFloat(item.quantity)

//         line_items.push({
//           quantity: item.quantity,
//           price_data: {
//             currency: "cad",
//             unit_amount: (Math.round(item.price * 100)),
//             product_data: {
//               name: item.name,
//             }
//           }
//         })
        
//       })
//       setLine(line_items);
//       setTotal(itTotal)
//     },[items.length])


//     const createStripeCheckout = httpsCallable(functions, "createStripeCheckout")

//     const stripeCheckout = async (items) => {
//       const stripePromise = loadStripe("pk_test_51LlQV3KsqmBXTMQLIPmH5fLYGqy2NuazSZV15C7G5mUvuMXneysyMbJZPA0sGehKRQMCaeLD1c0D4HvwEqnFgU6O004XWkq1eZ")
//       const stripe = await stripePromise;
//       console.log(createStripeCheckout())
//       const data = {
//         payment_method_types: ["card"],
//         mode: "payment",
//         success_url: "https://ryansmeats-697f9.web.app/success",
//         cancel_url: "https://ryansmeats-697f9.web.app/cancel",
//         line_items: [...line],
//       };

//     createStripeCheckout(data).then((response)=>{
//       const sessionId = response.data.id;
//       const result = stripe.redirectToCheckout({
//         sessionId: sessionId,
//       });
//       if (result.error){
//         alert(result.error.message);
//       }
//     })
//   }


//   return (
//     <div className='checkoutSlider'>
//         <button onClick={handleClose} className="btn" id="closeSlider"> close slider</button>
//         <h3>Checkout</h3>
//         <CheckoutList items = {items} showDel = {true}/>
//         <p className='total'>Total: {total}$</p>
//         <button className='btn' id="checkout" onClick = {() => stripeCheckout()}>Checkout</button>

//     </div>
//   )
// }
