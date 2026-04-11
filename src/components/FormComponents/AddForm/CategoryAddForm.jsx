import './CategoryAddForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const CategoryAddForm = props => {


    const [category_name, setCategoryName] = useState('')
    const [entry, setEntry] = useState({})
    const [buttonState, setButtonState] = useState(false)
    const _add = () => {
        props.onAddEntry(entry)
        _clear()
    }


    const _clear = () => {
        setCategoryName('')
    }

    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)
        setButtonState( (entry.category_name === '') ? false : true ) 

    },[entry])
    useEffect(() => {
        setEntry({ 'category_name' : category_name })
    },[category_name])
    const _detectValueChanged = (key, value) => {
        if (key === 'category_name') {
            setCategoryName(value)
        }
    }

    return(
        <div className='Form'>
            <label>Category:</label>
            <input type='text' placeholder='Category' value={category_name}
                   onChange = { e => _detectValueChanged('category_name', e.target.value) } />
                               <br/>
                               <Button clickme={ _add } title='Add Category' enabled={ buttonState }/>
        </div>
    )
}

export default CategoryAddForm