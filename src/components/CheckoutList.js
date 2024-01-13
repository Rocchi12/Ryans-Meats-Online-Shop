import React from 'react'
import { useCheckoutContext } from '../hooks/useCheckoutContext'

// styles

import "./CheckoutList.css"

export default function CheckoutList({ items, showDel, isSlider }) {
    const {deleteItem, deleteItemCheckout} = useCheckoutContext()

    const handleDelete = (id)=>{
      if (showDel){
        deleteItem(id)
      }
      else{
        deleteItemCheckout(id)
      }
    }

  return (
    <div className="checkoutList" id="cl">
    {items.map((item, index)=> (
            <div key={index} className='slideList'>
              {!isSlider && <img src={item.image} alt="item image" className="itemImage"/>}
              <div className='inf'>
                <h4>{item.name}</h4>

                <p>Pack Size: {item.pSize} Ounces: {item.oz}</p>
                
                <h4>{item.quantity} - {item.price*item.quantity}$</h4>
                <br></br>

                <button onClick={()=>(handleDelete(item.id))} className="removeButton"><p>Remove</p> </button>
              </div>
            </div>
        ))}

    </div>
  )
}
