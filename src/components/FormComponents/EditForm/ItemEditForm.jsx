import './ItemEditForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const ItemEditForm = props => {

    // Call parent update function with current form data.
    const _update = () => {
        props.onUpdateEntry(entry)
        _clear()
    }

    // Form state mirrors current values in inputs.
    const [category_id, setID] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sku, setSku] = useState('')


    // Combined object sent to App when edit is submitted.
    const [entry, setEntry] = useState({})

    // Controls whether Edit button is enabled.
    const [buttonState, setButtonState] = useState(false)

    //add local copy of App/_addEntry (define a new method)
    /*
    const _edit = () => {
        props.onEditEntry(entry)
        _clear()
    }
    */

    // Reset local form values.
    const _clear = () => {
        setID('')
        setTitle('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setSku('')
    }

    // Enable button only when required values are present.
    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)

        /*
        if (entry.category_name === '') {
            setButtonState(false)
        } else {
            setButtonState(true)
        }
        */

        setButtonState( (entry.category_id === '' || entry.title === '' || entry.description === '' || entry.price === '' || entry.quantity === '' || entry.sku === '') ? false : true ) 

    },[entry])

    // Build the entry payload object from current field values.
    useEffect(() => {
        setEntry({ 'id': props.entry.id, 'category_id': category_id, 'title': title, 'description': description, 'price': price, 'quantity': quantity, 'sku': sku })
    },[category_id, title, description, price, quantity, sku])

    // Handle changes from all 3 inputs in one place.
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

    // When selected row changes, preload form fields with that row's values.
    useEffect(() => {
        setID(props.entry.category_id)
        setTitle(props.entry.title)
        setDescription(props.entry.description)
        setPrice(props.entry.price)
        setQuantity(props.entry.quantity)
        setSku(props.entry.sku)
    },[props])//[] should be fine, [props] guarantees values received

    return(
        <div className='CategoryEditForm'>
            {/* Reusable button component; enabled only when values are valid. */}
            <Button clickme={ _update } title='Edit Item' enabled={ buttonState }/>
            <br/>
            <label>Item Name:</label>
            <input type='text' placeholder='Item Name' value={title}
                   onChange = { e => _detectValueChanged('title', e.target.value) } />
                   <label>Description:</label>
            <input type='text' placeholder='Description' value={description}
                   onChange = { e => _detectValueChanged('description', e.target.value) } />
                     <label>Price:</label>
            <input type='text' placeholder='Price' value={price}
                     onChange = { e => _detectValueChanged('price', e.target.value) } />
                        <label>Quantity:</label>
            <input type='text' placeholder='Quantity' value={quantity}
                     onChange = { e => _detectValueChanged('quantity', e.target.value) } />
                        <label>SKU:</label>
            <input type='text' placeholder='SKU' value={sku}
                     onChange = { e => _detectValueChanged('sku', e.target.value) } />
                        <label>Category:</label>
                        {/* dropdown for edit category */}
                <select value={category_id} onChange={e => _detectValueChanged('category_id', e.target.value)}>
                    <option value="">Select a category</option>
                    {props.categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            <br/>
           
        </div>
    )
}

export default ItemEditForm

//Notes:
// Issue: Keeping assignment rules and app behavior separate was confusing.
// Solution: Treat item id as auto-generated and hidden. It is not a user input, but it still needs to be carried in edit data so update/delete know which row to target.

// Issue: Category and item ids got mixed during preload.
// Solution: Use category_id for the category dropdown value, and use item id only for update targeting.

// Issue: Edit payload was missing required fields for update.
// Solution: Build one complete payload for edit submit with id, category_id, title, description, price, quantity, and sku.

// Issue: Category dropdown was present but not fully wired at first.
// Solution: Bind the dropdown value to form state and update that state on change, the same way as other inputs.

// Issue: Edit button enable logic was inconsistent.
// Solution: Validate required item fields together and only enable the button when all required values are present.

// Issue: Form looked fine in editor but could still fail at runtime.
// Solution: Check both syntax and flow: preload selected item, edit values, submit, and confirm the correct row updates.