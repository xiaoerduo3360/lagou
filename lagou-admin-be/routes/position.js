const express = require('express')
const router = express.Router()
const addControllers = require('../controllers/position')

// 中间键是一个方法
router.post('/add', addControllers.add)
router.post('/update', addControllers.update)
router.get('/find', addControllers.find)
router.get('/:id', addControllers.findById)
router.delete('/remove', addControllers.remove)
router.post('/query', addControllers.query)

module.exports = router