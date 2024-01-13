import React, {useState, useRef} from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { useStorage } from '../../hooks/useStorage'

// styles

import "./Admin.css"

export default function Admin() {

    const { addDocument, updateDocument, responce } = useFirestore('items')
    const { addImage, responce: res } = useStorage()

    const [newType, setNewType] = useState("")
    const [types, setTypes] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState("")
    const [description, setDescription] = useState("")
    const [feature, setFeature] = useState(false)
    const [oz, setOz] = useState("")
    const [pSize, setPSize] = useState("")
    const typeRef = useRef(null)

    const handleAdd = (e)=> {
        e.preventDefault()
        const ing = newType.trim()

        if (ing && !types.includes(ing)){
            setTypes(prevTypes => [...prevTypes, ing])
        }
        setNewType('')
        typeRef.current.focus()
    }

    const handleFileChange = (e)=> {
        setImage(null)
        let selected = e.target.files[0]

        console.log(e.target.files)
        for (let i = 0; i < e.target.files.length; ++i){
            if (!selected){
                setImageError('Please select a file')
                return
            }
            if (!selected.type.includes("image")) {
                setImageError('Selected file needs to be a image')
                return
            }
        }


        setImageError(null)

        setImage(e.target.files)
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let images = []

         const addedDoc = await addDocument({name,price,types, description, images, oz, pSize, feature})

        
        for (let i = 0; i < image.length; ++i){
            let imgUrl = await addImage(image[i], addedDoc)
            images.push(imgUrl)
        }
        await updateDocument(addedDoc, {images});

        window.location.reload();

    }

  return (
    <form className="adminPage" onSubmit={handleSubmit}>
        <h2>Add item</h2>

        <ul>
            <li>
                <label>
                <span>Name: </span>
                <input type="text" onChange={(e)=> {setName(e.target.value)}} value={name} />
                </label>

            </li>
            <li>
                <label>
                <span>Price: </span>
                <input type="number" onChange={(e)=> {setPrice(e.target.value)}} value={price} />
                </label>
            </li>
            <li>
                <label>
                    <span>image:</span>
                    <input type="file" onChange={handleFileChange}required multiple/>
                    {imageError && <div className="error">{imageError}</div>}
                </label>
            </li>
            <li>
                <label>
                    <span>featured?</span>
                    <input type="checkbox" id="featue" name="featue" checked={feature} onChange={(e)=> setFeature(!feature)}/>
                </label>
            </li>
            <li>
                <span>Types: </span>
                <input type="text" onChange={(e)=> {setNewType(e.target.value)}} value={newType} ref={typeRef} className='types'/>
                <button onClick={handleAdd} className="btn">add type</button>
                <br />
                {types.map((type) => <em key={type}>{type} </em>)}
                
            </li>

            <li>
                <label>
                <span>Ounces: </span>
                <input type="text" onChange={(e)=> {setOz(e.target.value)}} value={oz} />
                </label>

            </li>

            <li>
                <label>
                <span>Pack size: </span>
                <input type="number" onChange={(e)=> {setPSize(e.target.value)}} value={pSize} />
                </label>

            </li>

            <li>
                <label>
                <span>Description: </span>
                <br />
                <textarea type="text" onChange={(e)=> {setDescription(e.target.value)}} value={description} />
                </label>
            </li>

            {!responce.isPending && <button className="btn" id='sub'>Submit</button>}
        </ul>


      
    </form>
  )
}
