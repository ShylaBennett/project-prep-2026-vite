    import { useEffect, useState } from 'react'
    import axios from 'axios'
    import Table from '../TableComponents/Table/Table.jsx'
    import ItemAddForm from '../FormComponents/AddForm/ItemAddForm.jsx'
    import ItemEditForm from '../FormComponents/EditForm/ItemEditForm.jsx'
    
    
    
    
    const Items = props => {
    const [items, setItems] = useState([]);
      const [editingItems, setEditingItems] = useState(false);
        const [selectedItem, setSelectedItem] = useState({})
          const [categories, setCategories] = useState([]);

          useEffect(()=>{
    console.log(`App component has loaded`)

    // Retrieve all entries from backend and store in state.
            const itemsUrl = "http://127.0.0.1:3001/items"
    axios.get(itemsUrl)
         .then( response => {
            console.log(response) //{"entries":[]}
            // Update state the React way (never assign directly to entries).
            setItems(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })

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



  },[])

    // Called by AddForm when user submits a new entry.
  const _addItems = entry => {
    // Send to backend, then backend returns updated full list.
    const url = "http://127.0.0.1:3001/items"
    axios.post(url, { 
      item : entry
    })
    .then( response => {
      setItems(response.data.entries)
    })
    .catch( error => {
          console.log(error);
      })

  }


    // Called when user clicks Edit on a row.
  const _editItems = entry => {
    console.log(`_editItems fired`)
    console.log(entry)

    // Switch UI to EditForm and pass selected row data into it.
    setEditingItems(true)
    setSelectedItem(entry)
  }

  const _updateItems = entry => {
    console.log(`_updateItems fired`)
   console.log(entry)

    // PATCH updates one record by id.
    const url = `http://127.0.0.1:3001/items/${entry.id}`
    axios.patch(url, {
      item: entry
    }).then( response => {
      // Refresh table data and switch back to AddForm mode.
      setItems(response.data.entries)
      setEditingItems(false)
      setSelectedItem({})
    }).catch( error => {
        console.log(error);
    })

  }

  

    const _deleteItems = entry => {
    console.log(`_deleteItems fired`)
    console.log(entry)

    // DELETE removes one record by id, then backend returns updated list.
    const url = `http://127.0.0.1:3001/items/${entry.id}`
    axios.delete(url).then( response => {
      setItems(response.data.entries)
    }).catch( error => {
        console.log(error);
    })
}



    return(
        <div className='Items'>
  {
        editingItems ? (
          <ItemEditForm onUpdateEntry={ _updateItems } entry={ selectedItem } categories={ categories } />
        ) : (
          <ItemAddForm onAddEntry={ _addItems } categories={ categories } />
        )
      }
      
      
      <Table entries={items} onEditEntry={ _editItems } onDeleteEntry={ _deleteItems } />
      </div>
    )


    

        }
  export default Items

  //Notes:
//   the structure started mid-migration, with logic from App copied over before the page component shape was finished.
// Solution: build a valid page component first, then move logic in.

// React hooks were placed outside the component initially.
// Solution: keep all useState/useEffect calls inside the Items component function.

// Component naming got mismatched (Item vs Items export).
// Solution: keep one consistent component name and matching default export.

// Return block was nested inside a handler function.
// Solution: keep one main return at component level, with handlers defined above it.

// Missing imports caused hidden runtime risk (axios, table, forms).
// Solution: import every symbol used in the file at the top.

// Categories were used for dropdown props but not defined in the page.
// Solution: add categories state and fetch categories so ItemAddForm/ItemEditForm receive real data.

// Leftover category-related state/handlers stayed in the items page.
// Solution: remove non-item leftovers and keep only item-specific state and methods.

// File passed editor checks while still having logic wiring issues.
// Solution: validate both syntax and flow (imports, state ownership, props provided, handler usage).