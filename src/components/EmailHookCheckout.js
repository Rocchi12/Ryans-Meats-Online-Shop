import React, {useState} from 'react'
import emailjs from "emailjs-com"
import {useHistory} from "react-router-dom"
import { useCheckoutContext } from '../hooks/useCheckoutContext'


import "./EmailHookCheckout.css"
import ItemList from './ItemList'

export default function EmailHookCheckout({order, total}) {
    const {clearAll} = useCheckoutContext();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [comments, setComments] = useState("")
    const history = useHistory();

    const sendEmail = (e) => {
        e.preventDefault();

        const totalTemp = `<h1>Total: ${total}</h1>`
        const template = {
          firstName,
          lastName,
          email,
          city,
          street,
          postalCode,
          comments,
          order,
          totalTemp
        }


        emailjs.send('service_u1jzs69','template_z68e7ve',template,'WqVOs9rQKgvJoIFZJ')
        .then((res)=> {
            console.log(res.text)
        })
        .catch((err)=>{
            console.log(err)
        })

        
        clearAll();

        history.push("/success");

        setFirstName("")
        setLastName("")
        setComments("")
        setEmail("")
        setCity("")
        setStreet("")
        setPostalCode("")
  }
  return (
    <form className='emailHookCheckout' onSubmit={sendEmail}>
        <div className="twoInput">
            <label className='first'>
                <input type="text" onChange={(e)=> {setFirstName(e.target.value)}} placeholder="First Name" value={firstName} name="first"/>
            </label>
            <label className='second'>
                <input type="text" onChange={(e)=> {setLastName(e.target.value)}} placeholder="Last Name" value={lastName} name="last" />
             </label>
        </div>
        <div>
            <label>
                <input type="email" onChange={(e)=> {setEmail(e.target.value)}} placeholder="Email"value={email} className="fullLine" name="email"/>
             </label>
        </div>

        <div>
            <label >
              <input type="text" onChange={(e)=> {setCity(e.target.value)}} placeholder="City (Must be in Ontario Canada)" value={city} name="city" className="fullLine"/>
            </label>
        </div>

        <div>
            <label>
              <input type="text" onChange={(e)=> {setPostalCode(e.target.value)}} placeholder="Postal Code" value={postalCode} name="postalCode" className="fullLine"/>
            </label>
            
        </div>
        <div>
          <input type="text" onChange={(e)=> {setStreet(e.target.value)}} placeholder="Street Address (ex 123 Random St)" value={street} className="fullLine" name="street"/>
        </div>

        <div>
            <label>
            <br />
            <textarea type="text" onChange={(e)=> {setComments(e.target.value)}} placeholder="Any Comments or Prefences" value={comments} className="comment" name="question"/>
             </label>
        </div>
        <div>
            <button type="submit" className='btn' value="Send Message" id="subbut">Submit</button>
        </div>
     </form>
  )
}
