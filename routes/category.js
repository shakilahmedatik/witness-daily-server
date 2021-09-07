const express = require('express')
const router = express.Router()

const {
  categories,
  category,
  add,
  update,
  remove,
} = require('../controllers/categories')

//Get all categories
router.get('/categories', categories)

//Get single category by id
router.get('/category/:categoryId', category)

//Add a category
router.post('/category/add', add)

//Update single category by id
router.put('/category/update/:categoryId', update)

//Remove single category by id
router.delete('/category/remove/:categoryId', remove)

module.exports = router
