import './AddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const AddForm = props => {

    // State values that mirror each input field.
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')

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
        setValue1('')
        setValue2('')
        setValue3('')
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

        setButtonState( (entry.value1 === '' || entry.value2 === "" || entry.value3 === '') ? false : true ) 

    },[entry])

    // Keep the entry object in sync whenever any input changes.
    useEffect(() => {
        setEntry({ 'value1' : value1, 'value2': value2, 'value3': value3})
    },[value1, value2, value3])

    // Handle input changes using one helper function.
    const _detectValueChanged = (key, value) => {
        if (key === 'value1') {
            setValue1(value)
        } else if (key === 'value2') {
            setValue2(value)
        } else if (key === 'value3') {
            setValue3(value)
        }
        console.log('_detectValueChanged triggered')
    }

    return(
        <div className='Form'>
            {/* Reusable button component; disabled until inputs are valid. */}
            <Button clickme={ _add } title='Add Entry' enabled={ buttonState }/>
            <br/>
            <label>Value 1:</label>
            <input type='text' placeholder='Value1' value={value1}
                   onChange = { e => _detectValueChanged('value1', e.target.value) } />
            <br/>
            <label>Value 2:</label>
            <input type='text' placeholder='Value2' value={value2} 
                    onChange = { e => _detectValueChanged('value2', e.target.value) } />
            <br/>
            <label>Value 3:</label>
            <input type='text' placeholder='Value3' value={value3} 
                    onChange = { e => _detectValueChanged('value3', e.target.value) } />
        </div>
    )
}

export default AddForm