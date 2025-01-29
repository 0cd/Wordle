const router = require('express').Router()

const Word = require('../models/word')

router.get('/', async (req, res) => {
    const words = await Word.find({})
    res.json(words)
})

router.get('/:word', async (req, res) => {
    const word = await Word.findOne({ word: req.params.word })

    if (word) {
        res.json(word)
    } else {
        res.status(404).end()
    }
})

module.exports = router