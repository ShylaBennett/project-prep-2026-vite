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


            const itemsUrl = "http://127.0.0.1:3001/items"
    axios.get(itemsUrl)
         .then( response => {
            console.log(response) 
            setItems(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })

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

  const _addItems = entry => {
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

  const _editItems = entry => {
    console.log(`_editItems fired`)
    console.log(entry)
    setEditingItems(true)
    setSelectedItem(entry)
  }

  const _updateItems = entry => {
    console.log(`_updateItems fired`)
   console.log(entry)

    const url = `http://127.0.0.1:3001/items/${entry.id}`
    axios.patch(url, {
      item: entry
    }).then( response => {
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

 