import './ItemEditForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const ItemEditForm = props => {

    const _update = () => {
        props.onUpdateEntry(entry)
        _clear()
    }

    const [category_id, setID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')


    const [entry, setEntry] = useState({})


    const [buttonState, setButtonState] = useState(false)
    const _clear = () => {
        setID('')
        setTitle('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setSku('')
    }
    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        setButtonState( (entry.category_id === '' || entry.title === '' || entry.description === '' || entry.price === '' || entry.quantity === '' || entry.sku === '') ? false : true ) 

    },[entry])
    useEffect(() => {
        setEntry({ 'id': props.entry.id, 'category_id': category_id, 'title': title, 'description': description, 'price': price, 'quantity': quantity, 'sku': sku })
    },[category_id, title, description, price, quantity, sku])
    const _detectValueChanged = (key, value) => {
        if (key === 'category_id') {
            setID(value)
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
        console.log('_detectValueChanged triggered')
    }


    useEffect(() => {
        setID(props.entry.category_id)
        setTitle(props.entry.title)
        setDescription(props.entry.description)
        setPrice(props.entry.price)
        setQuantity(props.entry.quantity)
        setSku(props.entry.sku)
    },[props])

    return(
        <div className='CategoryEditForm'>


            <label>Edit Item:</label>
            <br/>
            <input type='text' placeholder='Item Name' value={title}
                   onChange = { e => _detectValueChanged('title', e.target.value) } />
                   <br />
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
                        {/* dropdown for edit category */}
                <select value={category_id} onChange={e => _detectValueChanged('category_id', e.target.value)}>
                    <option value="">Select a category</option>
                    {props.categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                        
                    ))}
                    <br/>
                    
                </select>
                <br/>
                <Button clickme={ _update } title='Edit Item' enabled={ buttonState }/>
            <br/>
           
        </div>
    )
}

export default ItemEditForm