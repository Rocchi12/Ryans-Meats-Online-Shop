import React, {useState} from 'react'

import { useHistory } from 'react-router-dom'

import { useLogin } from '../../hooks/useLogin'

import { useAuthContext } from '../../hooks/useAuthContext'

//styles

import "./Login.css"

export default function Login() {
    const {user} = useAuthContext()
    const history = useHistory()
    const { login, error, isPending } = useLogin()
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit =  async(e) => {
        e.preventDefault()

        await login(username,password)

        if (user){
            history.push("/admin")
        }

        
    }
  return (
    <form className='login' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <ul>
            <li>
                <label>
                <span>Username: </span>
                <input type="text" onChange={(e)=> {setUsername(e.target.value)}} value={username} />
                </label>

            </li>
            <li>
                <label>
                <span>Password: </span>
                <input type="password" onChange={(e)=> {setPassword(e.target.value)}} value={password} />
                </label>
            </li>
        </ul>

        {!isPending && <button className='btn'>Login</button>}
        {isPending && <button className='btn' disabled>Loading...</button>}
        {error && <p className="error">{error}</p>}


        
      
    </form>
  )
}
