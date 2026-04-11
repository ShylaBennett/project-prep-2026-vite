import './ItemAddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const ItemAddForm = props => {
    const [category_id, setCategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')
    const [entry, setEntry] = useState({})

    const [buttonState, setButtonState] = useState(false)
    const _add = () => {
        props.onAddEntry(entry)
        _clear()
    }
    const _clear = () => {
        setCategoryId('')
        setTitle('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setSku('')
    }

    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        setButtonState(
            entry.category_id !== '' &&
            entry.title !== '' &&
            entry.description !== '' &&
            entry.price !== '' &&
            entry.quantity !== '' &&
            entry.sku !== ''
        )

    },[entry])


    useEffect(() => {
        setEntry({'category_id' : category_id, 'title' : title, 'description' : description, 'price' : price, 'quantity' : quantity, 'sku' : sku })

    },[category_id, title, description, price, quantity, sku])


    const _detectValueChanged = (key, value) => {
        if (key === 'category_id') {
            setCategoryId(value)
        } else if (key === 'title') {
            setTitle(value)
        } else if (key === 'description') {
            setDescription(value)
        } else if (key === 'price') {
            setPrice(value)
        } else if (key === 'quantity') {
            setQuantity(value)
        } else if (key === 'sku') {
            setSku(value)
        }
    }

    return(
        <div className='Form'>
            <label>Items:</label>
            <br />
            <input type='text' placeholder='Item Name' value={title}
                   onChange = { e => _detectValueChanged('title', e.target.value) } />
                   <br/>
            <input type='text' placeholder='Description' value={description}
                   onChange = { e => _detectValueChanged('description', e.target.value) } />
            <br/>
            <input type='text' placeholder='Price' value={price}
                   onChange = { e => _detectValueChanged('price', e.target.value) } />
            <br/>
            <input type='text' placeholder='Quantity' value={quantity}
                   onChange = { e => _detectValueChanged('quantity', e.target.value) } />
            <br/>
            <input type='text' placeholder='SKU' value={sku}
                   onChange = { e => _detectValueChanged('sku', e.target.value) } />
            <br/>
            <select value={category_id} onChange={ e => _detectValueChanged('category_id', e.target.value) }
                >
                    {/* add dropdown */}
                <option value="">Select a category</option>
                {props.categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
                <br/>
            <Button clickme={ _add } title='Add Item' enabled={ buttonState }/>
        </div>
    )
}

export default ItemAddForm
