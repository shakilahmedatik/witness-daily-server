const express = require('express')
const router = express.Router()

const {
  articles,
  article,
  add,
  update,
  remove,
} = require('../controllers/articles')

//Get all articles
router.get('/articles', articles)

//Get single article by id
router.get('/article/:articleId', article)

//Add an article
router.post('/article/add/', add)

//Update single article by id
router.put('/article/update/:articleId', update)

//Remove single article by id
router.delete('/article/remove/:articleId', remove)

module.exports = router
