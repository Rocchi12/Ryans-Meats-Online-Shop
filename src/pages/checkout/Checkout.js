import React, {useState, useEffect} from 'react'
import CheckoutList from '../../components/CheckoutList'
import { useCheckoutContext } from '../../hooks/useCheckoutContext'
import {useHistory} from 'react-router-dom';
import EmailHookCheckout from '../../components/EmailHookCheckout';

// STRIPE STUFF
// import { functions } from '../../firebase/config'
// import { httpsCallable } from 'firebase/functions'
// import {loadStripe} from '@stripe/stripe-js'


//styles

import "./Checkout.css"

export default function Checkout() {
  
    const { items } = useCheckoutContext() 
    const [total, setTotal] = useState(0)
    const [templateString, setTemplateString] = useState("")
    const history = useHistory();

    useEffect(()=>{
      if (items.length == 0){
        history.push("/shop");
      }
      let itTotal = 0;
      let template = `<hr/>`;
      items.forEach((item)=>{
        template += 
        `
        <h3>${item.name}</h3>

        <p>Pack Size: ${item.pSize}      Ounces: ${item.oz}</p>
        
        <p>${item.quantity} - ${item.price*item.quantity}$</p>

        <hr/>
        `

        itTotal+= parseFloat(item.price*item.quantity)
        
      })


      setTotal(itTotal)
      setTemplateString(template);
    },[items.length])


  // STRIPE STUFF
  //   const createStripeCheckout = httpsCallable(functions, "createStripeCheckout")

  //   const stripeCheckout = async (items) => {
  //     const stripePromise = loadStripe("pk_test_51LlQV3KsqmBXTMQLIPmH5fLYGqy2NuazSZV15C7G5mUvuMXneysyMbJZPA0sGehKRQMCaeLD1c0D4HvwEqnFgU6O004XWkq1eZ")
  //     const stripe = await stripePromise;
  //     console.log(createStripeCheckout())
  //     const data = {
  //       payment_method_types: ["card"],
  //       mode: "payment",
  //       success_url: "http://localhost:3000/success",
  //       cancel_url: "http://localhost:3000/cancel",
  //       line_items: [
  //         {
  //           quantity: 1,
  //           price_data: {
  //             currency: "cad",
  //             unit_amount: (1)*100,
  //             product_data: {
  //               name: "aaaa",
  //             },
  //           },
  //         },
  //       ],
  //     };

  //   createStripeCheckout(data).then((response)=>{
  //     const sessionId = response.data.id;
  //     const result = stripe.redirectToCheckout({
  //       sessionId: sessionId,
  //     });
  //     if (result.error){
  //       alert(result.error.message);
  //     }
  //   });
  // }

  return (
    <div className='checkout'>

      <div className='showCheckout'>
        <h3>Checkout:</h3>
        {items && <CheckoutList items={items} showDel={false} className="list"/>}

        <h3>Total: {Math.round(total*100)/100}</h3>
      </div>

      {/* <button className="btn"  onClick={() => stripeCheckout()}>Checkout</button> */}
      <div className="spacing">
        <div className="checkoutFormCont">
          <div className="checkoutForm">
            <h3>Payment:</h3>
            <p>Fill out the form and you will recieve an email about payment. <strong>We only deliver in the Greater Toronto Area.</strong></p>
            <EmailHookCheckout order = {templateString} total = {Math.round(total*100)/100}/>
          </div>
        </div>
      </div>
      
    </div>
  )
}
