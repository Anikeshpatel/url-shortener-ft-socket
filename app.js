const express = require('express')
const urlRoutes = require('./routes/urlRoutes')
const clientManager = require('./utils/clients')

const app = express()
const http = require('http').Server(app)
clientManager.init(http)

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow', '*')
  next()
})

app.use('/', urlRoutes)

app.get('/', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname })
})

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500
  const msg = err.message
  const data = err.data
  res.status(status).json({
      msg,
      data
  })
})

const PORT = 8081
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
