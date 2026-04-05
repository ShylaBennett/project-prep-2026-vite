import './CategoryAddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const CategoryAddForm = props => {

    // State values that mirror each input field.
    const [category_name, setCategoryName] = useState('')


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
        setCategoryName('')
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

        setButtonState( (entry.category_name === '') ? false : true ) 

    },[entry])

    // Keep the entry object in sync whenever any input changes.
    useEffect(() => {
        setEntry({ 'category_name' : category_name })
    },[category_name])

    // Handle input changes using one helper function.
    const _detectValueChanged = (key, value) => {
        if (key === 'category_name') {
            setCategoryName(value)
        }
    }

    return(
        <div className='Form'>
            <Button clickme={ _add } title='Add Category' enabled={ buttonState }/>
            <br/>
            <label>Category:</label>
            <input type='text' placeholder='Category' value={category_name}
                   onChange = { e => _detectValueChanged('category_name', e.target.value) } />
        </div>
    )
}

export default CategoryAddForm