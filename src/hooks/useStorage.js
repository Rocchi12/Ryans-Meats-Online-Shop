import React from 'react'

import { useState, useEffect, useReducer } from 'react'
import { db, storage } from '../firebase/config'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { collection, setDoc, doc} from 'firebase/firestore'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

export const storageReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending: true, document: null, success: false, error: null}
        case 'ADDED_IMAGE' :
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'DELETED_IMAGE' :
            return { isPending: false, document: null, success: true, error: null}
        case 'ERROR': 
            return{isPending: false, document: null, success: false, error: action.payload}
        default:
            return state
    }
}

export function useStorage() {
    const [responce, dispatch] = useReducer(storageReducer, initialState)

    const [isCancelled, setIsCancelled] = useState((false))

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const addImage = async (image,id) => {
        dispatch({type: 'IS_PENDING'})

        try {

            const uploadPath= `/items/${id}}/${image.name}`
            const img = await ref(storage, uploadPath)
            const img2 = await uploadBytes(img, image)
            const imgUrl = await getDownloadURL(img)

            dispatchIfNotCancelled({type: 'ADDED_DOC', payload: imgUrl})
            return(imgUrl)
        }
        catch (err) {
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
            if(!isCancelled){
                console.log(err.message)
            }
        }
    }
    useEffect(() => {
        return() => setIsCancelled(true)
    }, []);

    return({addImage, responce})
}
