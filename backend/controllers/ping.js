const router = require('express').Router()

let requestCount = 0

router.get('/', (req, res) => {
    requestCount++;

    res.json({
        message: 'pong',
        requestCount: requestCount
    })
})

module.exports = router
