import {useEffect, useState} from 'react'
import axios from 'axios'
import './storefront.scss'

const Storefront = props => {

      const [categories,setCategories] = useState([]);
      const [items,setItems] = useState([]);



  useEffect(()=>{
    console.log("App component has loaded")
        const url = "http://127.0.0.1:3001/categories"
    axios.get(url)
         .then( response => {
            console.log(response) 
            setCategories(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })

        const itemsUrl = "http://127.0.0.1:3001/items"
    axios.get(itemsUrl)
         .then( response => {
            console.log(response) 
            setItems(response.data.entries)

         })
         .catch( error => {
            console.log(error);
        })



  }, [])

  const lookupCategory = category_id => {
    const category = categories.find(category => Number(category.id) === Number(category_id))
    return category ? category.name : "Unknown"
  }
    return(
        <div className="Storefront-Component">
            <img src={"/Banner.png"} />
            <h1>Welcome to A Crazy Store!</h1>
            <div className="store-grid">

            {items.map((item) => {
                const matchingCategory = lookupCategory(item.category_id);

    return (
      <div key={item.id} className="store-card">
        <h3>{item.title}</h3>
        <p>Category: {matchingCategory}</p>
        <p>Description: {item.description}</p>
        <p>Price:${item.price}</p>
      </div>
    );
  })}
</div>


</div>


            
)}




export default Storefront

