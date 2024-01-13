import { async } from '@firebase/util'
import { createContext, useState, useReducer, useEffect} from 'react'
import ItemList from '../components/ItemList'

export const CheckoutContext = createContext()

const checkoutReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return({...state , items: action.payload, showCheckout: true})
        case 'DELETE_ITEM':
            return({...state , items: action.payload, showCheckout: true})
        case 'DELETE_ITEM_CHECKOUT':
            return({...state , items: action.payload, showCheckout: false})
        case 'CLOSE_CHECKOUT':
            return({...state , showCheckout: false})
        case 'CLEAR_ALL':
            return({...state , items: [], showCheckout: false})
        default:
            return state
    }
}


export function CheckoutProvider({children}) {
    let lc = []
    if (localStorage.getItem('items')){
        lc = JSON.parse(localStorage.getItem('items'))
    }

    const [state, dispatch] = useReducer(checkoutReducer, {
        items: [...lc],
        showCheckout: false
        })


    let itemList = state.items
    

    const addItem = (item) => {

        
        itemList.push(item)

        dispatch({type: 'ADD_ITEM', payload: itemList})

        localStorage.setItem('items', JSON.stringify(state.items));

    }

    const deleteItem = (id) => {
        const filtered = itemList.filter((item) => (item.id != id))
        dispatch({type: 'DELETE_ITEM', payload: filtered})

        localStorage.setItem('items', JSON.stringify(filtered));

        if (filtered.length === 0){
            localStorage.clear()
        }

    }
    const deleteItemCheckout = (id => {
        const filtered = itemList.filter((item) => (item.id != id))
        dispatch({type: 'DELETE_ITEM_CHECKOUT', payload: filtered})

        localStorage.setItem('items', JSON.stringify(filtered));

        if (filtered.length === 0){
            localStorage.clear()
        }

    })

    const clearAll = () => {
        
        dispatch({type: 'CLEAR_ALL'});
        localStorage.clear();

    }
    const closeCheckout = () => {
        dispatch({type: 'CLOSE_CHECKOUT'})
    }

    return (
        <CheckoutContext.Provider value={{...state, addItem, deleteItem, deleteItemCheckout, closeCheckout, clearAll}}>
            {children}
        </CheckoutContext.Provider>
    )
}