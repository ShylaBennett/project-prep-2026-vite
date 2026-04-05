import './EditForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const EditForm = props => {

    // Call parent update function with current form data.
    const _update = () => {
        props.onUpdateEntry(entry)
        _clear()
    }

    // Form state mirrors current values in inputs.
    const [id, setID] = useState('')
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')

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
        setValue1('')
        setValue2('')
        setValue3('')
    }

    // Enable button only when required values are present.
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

    // Build the entry payload object from current field values.
    useEffect(() => {
        setEntry({ 'id': id, 'value1' : value1, 'value2': value2, 'value3': value3}) //now includes id
    },[value1, value2, value3])

    // Handle changes from all 3 inputs in one place.
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

    // When selected row changes, preload form fields with that row's values.
    useEffect(() => {
        setID(props.entry.id)
        setValue1(props.entry.value1)
        setValue2(props.entry.value2)
        setValue3(props.entry.value3)
    },[props])//[] should be fine, [props] guarantees values received

    return(
        <div className='EditForm'>
            {/* Reusable button component; enabled only when values are valid. */}
            <Button clickme={ _update } title='Edit Entry' enabled={ buttonState }/>
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

export default EditForm