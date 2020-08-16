const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017lagou', {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = mongoose