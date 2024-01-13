import { useState, useEffect } from 'react'
import { db, auth } from '../firebase/config'
import { useAuthContext, user } from './useAuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc, collection } from 'firebase/firestore'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState((false))
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()

    const login = async (email,password) => {
        setError(null)
        setIsPending(true)

        // sign the user out

        try{
            const res = await signInWithEmailAndPassword(auth,email,password)

            // update user status

            console.log(res.user.uid)

            // dispatch logout action

            dispatch({type: 'LOGIN', payload: res.user})




            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err){
            if (!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return() => setIsCancelled(true)
    }, []);

    return( {login, error, isPending} )

}