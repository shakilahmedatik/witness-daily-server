const Article = require('../models/article')
const { errorHandler } = require('../helpers/dbErrorHandler')

//Read all articles
exports.articles = (req, res) => {
  Article.find().exec((err, articles) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json(articles)
  })
}

//Read Single article
exports.article = async (req, res) => {
  const id = req.params.articleId
  await Article.findById(id).exec((err, article) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.json(article)
  })
}

//Add article
exports.add = (req, res) => {
  const newArticle = req.body
  const article = new Article(newArticle)
  article.save(function (err) {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    // saved!
    console.log('Article Saved')
  })
}

//Update article
exports.update = async (req, res) => {
  const id = req.params.articleId
  const UpdatedArticle = req.body
  await Article.findByIdAndUpdate(id, UpdatedArticle).exec(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      })
    }
    res.status(200).send('Article Updated Successfully')
  })
}
//Remove article
exports.remove = async (req, res) => {
  const id = req.params.articleId

  await Article.findByIdAndRemove(id, () => {
    res.status(200).send('Article Deleted Successfully')
  })
}
