import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, doc, onSnapshot } from "firebase/firestore"


export const useDocument = (collec, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = doc(collection(db, collec), id)

        const unsub = onSnapshot(ref, (snapshot) => {
            if (snapshot.data()){
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null)
            }
            else {
                setError('No document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError("failed to get document")
        })

        return () => unsub()

    }, [collec,id])

    return {document, error}
}
