import './CategoryEditForm.scss'
import Button from '../Button/Button.jsx'
import { useState, useEffect } from 'react'

const CategoryEditForm = props => {

    const _update = () => {
        props.onUpdateEntry(entry)
        _clear()
    }

    const [id, setID] = useState('')
    const [category_name, setCategoryName] = useState('')
    const [entry, setEntry] = useState({})
    const [buttonState, setButtonState] = useState(false)


    const _clear = () => {
        setID('')
        setCategoryName('')
    }

    useEffect(() => {
        console.log('entry changed')
        console.log(`entry: ${JSON.stringify(entry)}`)


        setButtonState( (entry.category_name === '') ? false : true ) 

    },[entry])


    useEffect(() => {
        setEntry({ 'id': id, 'category_name': category_name }) 
    },[id, category_name])

    const _detectValueChanged = (key, value) => {
        if (key === 'category_name') {
            setCategoryName(value)
        }
        console.log('_detectValueChanged triggered')
    }

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