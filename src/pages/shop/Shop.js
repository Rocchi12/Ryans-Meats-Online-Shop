import React from 'react'
import { useCollection } from '../../hooks/useCollection'

import ItemList from '../../components/ItemList'
import regular from '../../images/regualrItemsPrices.png'
import other from '../../images/otherItemsPrices.png'
import logo from '../../images/flyerLogo.png'

import "./Shop.css"

// styles

import "./Shop"

export default function Shop() {
  const { documents, error } = useCollection("items")

  return (
    <div className='shop'>
       <div className='prices'>
        <img src={regular} alt="prices" className='reg'/>
        <img src={other} alt="prices" className='oth'/>
      </div>
      {!documents && <div className='footFix'>Loading...</div>}
      {documents && <ItemList items={documents} />}
      
    </div>
  )
}
