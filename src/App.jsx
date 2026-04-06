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
      <nav>
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
