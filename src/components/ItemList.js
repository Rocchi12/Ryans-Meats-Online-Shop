import React from 'react'
import { Link } from 'react-router-dom'

import "./ItemList.css"

export default function ItemList({items}) {
  return (
    <div className="itemList">
        <ul>
        {(items.length === 0) && <p>There are no items</p>}
        {(items.length >= 1) && items.map((item) => 
            <Link key={item.id} to={`items/${item.id}`}>
                <img src={item.images[0]} alt="image"/>

                <h2>{item.name}</h2>
                <p className='price'>${item.price}</p>

                <p>Pack Size: {item.pSize}</p>
                <p>Ounces: {item.oz}</p>
            </Link>
        )} 
        </ul>

      
    </div>
  )
}
