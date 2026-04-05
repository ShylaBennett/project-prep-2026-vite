import { useEffect, useState } from 'react'
// axios is used to send HTTP requests to the Node/Express server.
import axios from 'axios';
import './App.scss'
import Table from './components/TableComponents/Table/Table.jsx';
import CategoryAddForm from './components/FormComponents/AddForm/CategoryAddForm.jsx';
import CategoryEditForm from './components/FormComponents/EditForm/CategoryEditForm.jsx';

const App = props => {

  // categories: array shown in the table.
  const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
  // editing: controls whether AddForm or EditForm is displayed.
  const [editing, setEditing] = useState(false);
  const [editingItems, setEditingItems] = useState(false);
  // selectedEntry: row currently being edited.
  const [selectedEntry, setSelectedEntry] = useState({})
    const [selectedItem, setSelectedItem] = useState({})

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
  const _editEntry = entry => {
    console.log(`_editEntry fired`)
    console.log(entry)

    // Switch UI to EditForm and pass selected row data into it.
    setEditing(true)
    setSelectedEntry(entry)
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
    <div className='App'>
      {
        // Conditionally render form based on editing mode.
        editing ? (
          <CategoryEditForm onUpdateEntry={ _updateEntry } entry={ selectedEntry } />
        ) : (
          <CategoryAddForm onAddEntry={ _addEntry } />

        )
      }
      
      <Table entries={categories} onEditEntry={ _editEntry } onDeleteEntry={ _deleteEntry } />


<div className='items'>
  {
        editingItems ? (
          <CategoryEditForm onUpdateEntry={ _updateItems } entry={ selectedItem } />
        ) : (
          <CategoryAddForm onAddEntry={ _addItems } />
        )
      }
      
      
      <Table entries={items} onEditEntry={ _editItems } onDeleteEntry={ _deleteItems } />
      </div>
    </div>
  )

}

export default App;

// 1. Ternary Basics In JSX

// A ternary must always be: condition -> ? -> true result -> : -> false result.
// You only need one ? and one : for a simple two-branch switch.
// If you see extra words like false, EditForm, or other variables in the middle, it usually breaks.
// 2. JSX Logic Must Be Wrapped

// HTML-like tags can be written directly.
// JavaScript logic (like ternary) must be inside a JSX expression wrapper.
// If logic is not wrapped, React treats it like invalid text in markup.
// You fixed this correctly in App.jsx.
// 3. One Return, Many Sections

// You do not need multiple returns.
// Keep one return(...) per component.
// Inside that one return, you can have multiple sections and multiple conditionals.
// 4. Keep Categories And Items Separate

// Categories and items are two different mini-features.
// Each needs its own handlers: add, edit, update, delete.
// Each should have separate edit state to avoid cross-over bugs.
// Example concept: category edit mode should not control item form.
// 5. Route Param Name Must Match Controller Param

// If route is :item, controller should read request.params.item.
// If route is :category, controller should read request.params.category.
// Mismatched names cause delete/update to fail silently or hit wrong data.
// 6. Prop Names Must Match Component Expectations

// Parent props must match what child component reads.
// If table expects entries, pass entries.
// If parent sends items but child reads entries, data won’t render.
// 7. Reuse Pattern, Don’t Blind Copy

// Items should be built with same CRUD pattern as categories.
// But items have extra fields and category dropdown, so details differ.
// Same skeleton, different data model.
// 8. Storefront Is Read-Focused

// Storefront generally needs read-only behavior.
// It should display final product info clearly (title, category, description, price).
// It often needs joined data (item + category name), not raw single-table output.
// 9. Debugging Habit That Helped

// Change one small thing.
// Re-check the exact file.
// Fix the next blocker.
// This step-by-step approach is why you got unstuck.
