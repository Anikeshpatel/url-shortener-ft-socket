const express = require('express')
const { BASE_URL } = require('../const')
const router = express.Router()
const urlDAO = require('../dao/urlDAO')
const { generateId } = require('../utils')
const clientManager = require('../utils/clients')

router.post('/url', (req, res, next) => {
  const url = req.body.url

  if (!url && url.length < 3) {
    const error = new Error('Validation: url is not valid')
    next(error)
    return
  }

  const id = generateId()

  urlDAO.addShortUrl({
    url,
    id
  })

  setTimeout(() => {
    clientManager.sendResTo(req.body.clientId, {
      url: `${BASE_URL}${id}`
    })
  }, 2000)

  return res.status(200).send({
    id,
    url
  })
})

router.get('/urls', (req, res, next) => {
  try {
      const urls = urlDAO.getUrls()
      res.status(200).send(urls.map(url => ({
        ...url,
        shortUrl: `${BASE_URL}${url.id}`
      })))
  }catch (e) {
      next(e)
  }
})

router.get('/:urlId', (req, res, next) => {
  try {
      const urlId = req.params.urlId
      const url = urlDAO.getUrlById(urlId)
      if (!url) {
          return res.status(404).json({
              message: "Url not found"
          })
      }
      res.status(200).send({
        url: url.url
      })
  }catch (e) {
      next(e)
  }
})

module.exports = router
