
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// const api = require("./routes/api");
const app = express()

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/public', express.static('public'));
app.use('/temp', express.static('temp'));

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

require('./db/db-connect')
module.exports = app

