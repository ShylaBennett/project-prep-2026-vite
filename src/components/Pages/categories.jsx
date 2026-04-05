        import { useEffect, useState } from 'react'
    import axios from 'axios'
    import Table from '../TableComponents/Table/Table.jsx'
    import CategoryAddForm from '../FormComponents/AddForm/CategoryAddForm.jsx'
    import CategoryEditForm from '../FormComponents/EditForm/CategoryEditForm.jsx';
    
    const Categories = props => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({})



  // Runs once when App first loads to fetch initial data.
  useEffect(()=>{
    console.log(`App component has loaded`)

    // Retrieve all entries from backend and store in state.

    const url = "http://127.0.0.1:3001/categories"
    axios.get(url)
         .then( response => {
            console.log(response) //{"entries":[]}
            // Update state the React way (never assign directly to entries).
            setCategories(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })



    //         const itemsUrl = "http://127.0.0.1:3001/items"
    // axios.get(itemsUrl)
    //      .then( response => {
    //         console.log(response) //{"entries":[]}
    //         // Update state the React way (never assign directly to entries).
    //         setItems(response.data.entries)

    //      })
    //      .catch( error => {
    //         console.log(error);
    //     })



  },[])

  // Called by CategoryAddForm when user submits a new entry.
  const _addEntry = entry => {

    // Send to backend, then backend returns updated full list.

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



  // Called when user clicks Edit on a row.
  const _editEntry = entry => {
    console.log(`_editEntry fired`)
    console.log(entry)

  //   // Switch UI to EditForm and pass selected row data into it.
    setEditing(true)
    setSelectedEntry(entry)
  }


  // Called by EditForm after user submits changes.
  const _updateEntry = entry => {
    console.log(`_updateEntry fired`)
   console.log(entry)

    // PATCH updates one record by id.
    const url = `http://127.0.0.1:3001/categories/${entry.id}`
    axios.patch(url, {
      item: entry
    }).then( response => {
      // Refresh table data and switch back to AddForm mode.
      setCategories(response.data.entries)
      setEditing(false)
      setSelectedEntry({})
    }).catch( error => {
        console.log(error);
    })

  }

  // Called when user clicks Delete on a row.
  const _deleteEntry = entry => {
    console.log(`_deleteEntry fired`)
    console.log(entry)

    // DELETE removes one record by id, then backend returns updated list.
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
        // Conditionally render form based on editing mode.
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