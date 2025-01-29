const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const { MONGODB_URI } = require('./utils/config')

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(cors())

const pingRouter = require('./controllers/ping')
const wordsRouter = require('./controllers/words')

app.use('/api/v1/ping', pingRouter)
app.use('/api/v1/words', wordsRouter)

module.exports = app