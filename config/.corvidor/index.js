const express = require('express')
const routes = require('./routes')
const regenerate = require('./regenerate')

const app = express()

regenerate()

app.use('/', routes)

const PORT = process.env.PORT || 7000

app.listen(PORT, () => console.log(`\nYour API is located at http://localhost:${PORT}\n\nYour docs endpoint is located at http://localhost:${PORT}/docs-data\n\nYour docs are located at http://localhost:${PORT}/docs`))