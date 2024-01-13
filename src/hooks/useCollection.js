import { useEffect, useState, useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"


export const useCollection = (collec, _q, _o) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const q = useRef(_q).current
    const o = useRef(_o).current

    useEffect(() => {
        let ref = collection(db, collec)

        if (q){
            ref = query(ref, where(...q))
        }
        if (o){
            ref = query(ref, orderBy(...o))
        }

        const unsub = onSnapshot(ref, (snapshot)=>{
            let result = []

            snapshot.docs.forEach((doc)=>{
                result.push({...doc.data(), id: doc.id})
            })

            // update state
            setDocuments(result)
            setError(null)
        },(error)=> {
            console.log(error)
            setError('could not fetch data')
        })

        // unsub on unmount
        return () => unsub()

    }, [collec, q, o])

    return { documents, error}


}