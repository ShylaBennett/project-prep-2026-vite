import { useEffect, useState } from 'react'

import './App.scss'

import Items from './components/Pages/items.jsx';
import Categories from './components/Pages/categories.jsx';
import Storefront from './components/Pages/storefront.jsx';
import { Link, Route, Routes,Navigate } from 'react-router-dom'


const App = props => {


  useEffect(()=>{
    console.log(`App component has loaded`)
  },[])

  return(
    <div className='App'>
      <nav className='nav'>
        <Link to="/items">Items</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/storefront">Storefront</Link>
      </nav>
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/storefront" element={<Storefront />} />
        <Route path="/" element={<Navigate to="/storefront" />} />
      </Routes>
    </div>
    

  )

}


export default App;