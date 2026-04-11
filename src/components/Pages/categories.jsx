        import { useEffect, useState } from 'react'
    import axios from 'axios'
    import Table from '../TableComponents/Table/Table.jsx'
    import CategoryAddForm from '../FormComponents/AddForm/CategoryAddForm.jsx'
    import CategoryEditForm from '../FormComponents/EditForm/CategoryEditForm.jsx';
    
    const Categories = props => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({})
  
  useEffect(()=>{
    console.log(`App component has loaded`)
    const url = "http://127.0.0.1:3001/categories"
    axios.get(url)
         .then( response => {
            console.log(response) 
            setCategories(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })
  },[])

  const _addEntry = entry => {

    const url = "http://127.0.0.1:3001/categories"
    axios.post(url, { 
      item : entry
    })
    .then( response => {
      setCategories(response.data.entries)
    })
    .catch( error => {
          console.log(error);
      })

  }
  const _editEntry = entry => {
    console.log(`_editEntry fired`)
    console.log(entry)
    setEditing(true)
    setSelectedEntry(entry)
  }

  const _updateEntry = entry => {
    console.log(`_updateEntry fired`)
   console.log(entry)
    const url = `http://127.0.0.1:3001/categories/${entry.id}`
    axios.patch(url, {
      item: entry
    }).then( response => {
      setCategories(response.data.entries)
      setEditing(false)
      setSelectedEntry({})
    }).catch( error => {
        console.log(error);
    })

  }

  const _deleteEntry = entry => {
    console.log(`_deleteEntry fired`)
    console.log(entry)
    const url = `http://127.0.0.1:3001/categories/${entry.id}`
    axios.delete(url).then( response => {
      setCategories(response.data.entries)
    }).catch( error => {
        console.log(error);
    })


    
  }

  return(
    <div className='Categories'>
      {
        editing ? (
          <CategoryEditForm onUpdateEntry={ _updateEntry } entry={ selectedEntry } />
        ) : (
          <CategoryAddForm onAddEntry={ _addEntry } />

        )
      }
      
      <Table entries={categories} onEditEntry={ _editEntry } onDeleteEntry={ _deleteEntry } />
      </div>
  )

    }
    export default Categories