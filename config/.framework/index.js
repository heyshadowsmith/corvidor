const express = require('express')
const routes = require('./routes')
const regenerate = require('./regenerate')

const app = express()

regenerate()

app.use('/', routes)

const PORT = process.env.PORT || 7000

app.listen(PORT, () => console.log(`Running on port ${PORT}.`))