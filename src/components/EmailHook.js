import React, {useState} from 'react'
import emailjs from "emailjs-com"


//styles
import "./EmailHook.css"

export default function EmailHook() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_u1jzs69','template_6lpdjfv',e.target,'WqVOs9rQKgvJoIFZJ')
        .then((res)=> {
            console.log(res.text)
        })
        .catch((err)=>{
            console.log(err)
        })


        setFirstName("")
        setLastName("")
        setDescription("")
        setEmail("")
    }
  return (
     <form className='emailHook' onSubmit={sendEmail}>
        <div className="nameE">
            <label className='fName'>
                <input type="text" onChange={(e)=> {setFirstName(e.target.value)}} placeholder="First Name" value={firstName} name="first"/>
            </label>
            <label className='lName'>
                <input type="text" onChange={(e)=> {setLastName(e.target.value)}} placeholder="Last Name" value={lastName} name="last" />
             </label>
        </div>
        <div>
            <label>
                <input type="email" onChange={(e)=> {setEmail(e.target.value)}} placeholder="Email"value={email} className="email" name="email"/>
             </label>
        </div>

        <div>
            <label>
            <br />
            <textarea type="text" onChange={(e)=> {setDescription(e.target.value)}} placeholder="Type Question" value={description} className="question" name="question"/>
             </label>
        </div>
        <div>
            <button type="submit" className='btn' value="Send Message" id="subbut">Submit</button>
        </div>
     </form>
  )
}
