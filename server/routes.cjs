// Express Router lets us split routes into a separate file.
const express = require('express')
// Controller contains the functions that actually run for each route.
const EntryController = require('./controllers/EntryController.cjs')

// Create a new router instance.
const router = express.Router()

// Category routes (CRUD): list, create, update, delete.
router.get('/categories', EntryController.index)
router.post('/categories', EntryController.store)
router.patch('/categories/:category', EntryController.update)
router.delete('/categories/:category', EntryController.destroy)

// Item routes (CRUD): list, create, update, delete.
router.get('/items', EntryController.index)
router.post('/items', EntryController.store)
router.patch('/items/:item', EntryController.update)
router.delete('/items/:item', EntryController.destroy)

router.get('/storefront', EntryController.index)
// router.post('/storefront', EntryController.store)
// router.patch('/storefront/:storefront', EntryController.update)
// router.delete('/storefront/:storefront', EntryController.destroy)

// Export router so server.cjs can mount it with server.use().
module.exports = router

//Notes: 
//Categories and items require CRUD routes, storefront only needs read (GET) routes.