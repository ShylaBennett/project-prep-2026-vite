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

//Notes:
// useState for categories: stores all category rows fetched from backend so category ids can be translated into names.
// useState for items: stores all item rows fetched from backend that will be displayed as storefront cards.
// useEffect on load: runs once when the storefront page opens, then triggers data loading from backend endpoints.
// Categories GET request: calls backend categories endpoint and saves response into categories state.
// Items GET request: calls backend items endpoint and saves response into items state.
// Error handlers (catch): logs request failures so you can debug connection/API issues during development.
// lookupCategory(category_id): helper function that finds the category object whose id matches an item’s category_id, then returns the category name (or "Unknown" if not found).
// <img src="/Banner.png" />: displays the storefront banner image from the public folder.
// Storefront heading (<h1>): page title shown under/near the banner.
// .store-grid container: wraps all item cards; intended to be styled as a CSS grid layout.
// items.map(...): loops through each fetched item and renders one card per item.
// Card key (key={item.id}): gives each rendered card a stable unique identity for React list rendering.
// Card fields shown per item:
// Title (item.title)
// Category name (lookupCategory(item.category_id))
// Description (item.description)
// Price (item.price)
// export default Storefront: makes this page usable in router route config so storefront can render it.