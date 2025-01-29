const router = require('express').Router()

const Word = require('../models/word')

router.get('/', async (req, res) => {
    const words = await Word.find({})
    res.json(words)
})

router.get('/word/:word', async (req, res) => {
    const word = await Word.findOne({ word: req.params.word })

    if (word) {
        res.json(word)
    } else {
        res.status(404).end()
    }
})

router.get('/random', async (req, res) => {
    const words = await Word.find({})
    const index = Math.floor(Math.random() * words.length)

    res.json(words[index])
})

router.get('/today', async (req, res) => {
    const words = await Word.find({})

    const date = new Date()
    const dateString = date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0')

    const seed = parseInt(dateString)
    const index = seed % words.length

    res.json(words[index])
})


module.exports = router