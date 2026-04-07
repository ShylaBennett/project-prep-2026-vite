import './ItemAddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const ItemAddForm = props => {

    // State values that mirror each input field.
    const [category_id, setCategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')
    


    // Combined object sent back to App when user clicks Add Entry.
    const [entry, setEntry] = useState({})

    // Controls if Add button is enabled.
    const [buttonState, setButtonState] = useState(false)

    // Call parent function and then clear the form.
    const _add = () => {
        props.onAddEntry(entry)
        _clear()
    }

    // Reset all input fields.
    const _clear = () => {
        setCategoryId('')
        setTitle('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setSku('')
    }

    // Enable button only when all fields have values.
    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        /*
        if (entry.value1 === '' || entry.value2 === "" || entry.value3 === '') {
            setButtonState(false)
        } else {
            setButtonState(true)
        }
        */


        setButtonState(
            entry.category_id !== '' &&
            entry.title !== '' &&
            entry.description !== '' &&
            entry.price !== '' &&
            entry.quantity !== '' &&
            entry.sku !== ''
        )

    },[entry])

    // Keep the entry object in sync whenever any input changes.
    useEffect(() => {
        setEntry({'category_id' : category_id, 'title' : title, 'description' : description, 'price' : price, 'quantity' : quantity, 'sku' : sku })

    },[category_id, title, description, price, quantity, sku])


    // Handle input changes using one helper function.
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

//Notes:
// The item form had to only enable the Add button when every field was filled in. The fix was to check all required fields together with a simple true/false condition.
// The item form needed to keep its inputs and saved data in sync. The fix was to store each input in state, then combine them into one object before sending it back to the parent.
// The category dropdown needed real database data instead of hardcoded options. The fix was to pass the categories array into the form and map over it to build the options.
// The app needed categories and items to stay separate. The fix was to give each one its own add, edit, update, and delete handlers.
// JSX conditional rendering needed the correct ternary structure. The fix was to keep the condition, the true result, and the false result in the right order inside one JSX expression.
// Missing imports or missing component files could break the app at runtime. The fix was to make sure every component used in App.jsx is both imported and actually exists.
// Field names needed to stay consistent across frontend and backend. The fix was to use matching names like category_id and title so the data flows cleanly.