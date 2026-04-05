import { useEffect, useState } from 'react'
// axios is used to send HTTP requests to the Node/Express server.
import axios from 'axios';
import './App.scss'
import Table from './components/TableComponents/Table/Table.jsx';
import AddForm from './components/FormComponents/AddForm/AddForm.jsx';
import EditForm from './components/FormComponents/EditForm/EditForm.jsx';

const App = props => {

  // entries: array shown in the table.
  const [entries, setEntries] = useState([]);
  // editing: controls whether AddForm or EditForm is displayed.
  const [editing, setEditing] = useState(false);
  // selectedEntry: row currently being edited.
  const [selectedEntry, setSelectedEntry] = useState({})

  // Runs once when App first loads to fetch initial data.
  useEffect(()=>{
    console.log(`App component has loaded`)

    // Retrieve all entries from backend and store in state.

    const url = "http://127.0.0.1:3001/entries"
    axios.get(url)
         .then( response => {
            console.log(response) //{"entries":[]}
            // Update state the React way (never assign directly to entries).
            setEntries(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })


  },[])

  // Called by AddForm when user submits a new entry.
  const _addEntry = entry => {

    // Send to backend, then backend returns updated full list.

    const url = "http://127.0.0.1:3001/entries"
    axios.post(url, { 
      item : entry
    })
    .then( response => {
      setEntries(response.data.entries)
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

  // Called by EditForm after user submits changes.
  const _updateEntry = entry => {
    console.log(`_updateEntry fired`)
   console.log(entry)

    // PATCH updates one record by id.
    const url = `http://127.0.0.1:3001/entries/${entry.id}`
    axios.patch(url, {
      item: entry
    }).then( response => {
      // Refresh table data and switch back to AddForm mode.
      setEntries(response.data.entries)
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
    const url = `http://127.0.0.1:3001/entries/${entry.id}`
    axios.delete(url).then( response => {
      setEntries(response.data.entries)
    }).catch( error => {
        console.log(error);
    })
  }

  return(
    <div className='App'>
      {
        // Conditionally render form based on editing mode.
        editing ? (
          <EditForm onUpdateEntry={ _updateEntry } entry={ selectedEntry } />
        ) : (
          <AddForm onAddEntry={ _addEntry } />
        )
      }
      
      <Table entries={entries} onEditEntry={ _editEntry } onDeleteEntry={ _deleteEntry } />
    </div>
  )

}

export default App;
