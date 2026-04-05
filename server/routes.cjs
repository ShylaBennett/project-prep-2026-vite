// Express Router lets us split routes into a separate file.
const express = require('express')
// Controller contains the functions that actually run for each route.
const EntryController = require('./controllers/EntryController.cjs')
const CategoriesController  = require('./controllers/CategoriesController.cjs')
const ItemsController  = require('./controllers/ItemsController.cjs')

// Create a new router instance.
const router = express.Router()

// Category routes (CRUD): list, create, update, delete.
router.get('/categories', CategoriesController.index)
router.post('/categories', CategoriesController.store)
router.patch('/categories/:category', CategoriesController.update)
router.delete('/categories/:category', CategoriesController.destroy)

// Item routes (CRUD): list, create, update, delete.
router.get('/items', ItemsController.index)
router.post('/items', ItemsController.store)
router.patch('/items/:item', ItemsController.update)
router.delete('/items/:item', ItemsController.destroy)

router.get('/storefront', EntryController.index)
// router.post('/storefront', EntryController.store)
// router.patch('/storefront/:storefront', EntryController.update)
// router.delete('/storefront/:storefront', EntryController.destroy)

// Export router so server.cjs can mount it with server.use().
module.exports = router

//Notes: 
//Categories and items require CRUD routes, storefront only needs read (GET) routes.