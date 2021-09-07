const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler')

//Create a category
exports.add = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json({ data })
  })
}

//Get all categories
exports.categories = async (req, res) => {
  await Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories not found',
      })
    }
    res.json(categories)
  })
}

//Get single category
exports.category = async (req, res) => {
  const id = req.params.id
  await Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'Category does not exist',
      })
    }
    res.json(category)
  })
}

//Update a category
exports.update = async (req, res) => {
  const id = req.params.categoryId
  const UpdatedCategory = req.body
  await Category.findByIdAndUpdate(id, UpdatedCategory).exec(err => {
    if (err) {
      return res.status(400).json({
        error: 'Category not found',
      })
    }
    res.status(200).send('Category Updated Successfully')
  })
}

//Remove a category
exports.remove = async (req, res) => {
  const id = req.params.categoryId
  await Category.findOneAndRemove(id, (err, docs) => {
    if (err) {
      throw err
    } else {
      console.log('Removed Category : ', docs)
      res.status(200).send('Category Deleted Successfully')
    }
  })
}
