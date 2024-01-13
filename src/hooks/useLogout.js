import { useState, useEffect } from 'react'
import { db, auth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState((false))
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out

        try{
            // update online status



            await signOut(auth)

            // dispatch logout action

            dispatch({type: 'LOGOUT'})

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

    return( {logout, error, isPending} )

}