import './CategoryEditForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const CategoryEditForm = props => {

    // Call parent update function with current form data.
    const _update = () => {
        props.onUpdateEntry(entry)
        _clear()
    }

    // Form state mirrors current values in inputs.
    const [id, setID] = useState('')
    const [category_name, setCategoryName] = useState('')


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
        setCategoryName('')
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

        setButtonState( (entry.category_name === '') ? false : true ) 

    },[entry])

    // Build the entry payload object from current field values.
    useEffect(() => {
        setEntry({ 'id': id, 'category_name': category_name }) 
    },[id, category_name])

    // Handle changes from all 3 inputs in one place.
    const _detectValueChanged = (key, value) => {
        if (key === 'category_name') {
            setCategoryName(value)
        }
        console.log('_detectValueChanged triggered')
    }

    // When selected row changes, preload form fields with that row's values.
    useEffect(() => {
        if (!props.entry) return
        setID(props.entry.id)
        setCategoryName(props.entry.name ?? props.entry.category_name ?? '')
    },[props.entry])

    return(
        <div className='CategoryEditForm'>
    
            <label>Category: </label>
            <input type='text' placeholder='Category Name' value={category_name}
                   onChange = { e => _detectValueChanged('category_name', e.target.value) } />
            <br/>
            <Button clickme={ _update } title='Edit Category' enabled={ buttonState }/>
           
        </div>
    )
}

export default CategoryEditForm