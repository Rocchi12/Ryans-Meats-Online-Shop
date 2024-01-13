import { useReducer, useEffect, useState } from "react"
import { db, timestamp } from "../firebase/config"
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: false, error: null}
        case 'ADDED_DOC' :
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'DELETED_DOC' :
            return { isPending: false, document: null, success: true, error: null}
        case 'UPDATE_DOCUMENT':
            return{isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR': 
            return{isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}
export const useFirestore = ( collec ) => {
    const [responce, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = collection(db, collec)

    // only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add a doc
    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})
   

        try{
            console.log(doc)
            const addedDocument = await addDoc(ref, {...doc})
            dispatchIfNotCancelled({type: 'ADDED_DOC', payload: addedDocument})
            console.log('try')
            return(addedDocument.id)

        }
        catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
            console.log(err)
        }
    }

    // delete a doc

    const deleteDocument = async(id) => {
        dispatch({ type: "IS_PENDING" })

        try {
            const spef = doc(db, collec, id)
            const deleteDocument = await deleteDoc(spef)
            dispatchIfNotCancelled({type: "DELETED_DOC", payload: deleteDocument})
        }
        catch (err){
            dispatchIfNotCancelled({ type: "error", payload: err})
        }
    }

    // update document

    const updateDocument = async ( id, updates ) => {

        dispatch({type: 'IS_PENDING'})

        try{
            console.log(updates)
            const updatedDocument = await updateDoc(doc(ref, id), updates)
            dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument})
            return(updatedDocument)
        }
        catch(err){
            dispatchIfNotCancelled({type:'ERROR', payload: err.message})
            return null
        }


    }

    useEffect(() => {
        return()=> setIsCancelled(true)
    },[])


    return({addDocument, deleteDocument, updateDocument, responce})
}