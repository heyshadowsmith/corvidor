const { Router } = require('express')
const path = require('path')
const cors = require('cors')
const config = require('../../corvidor.json')

// Require HTTP request method routes
const routes = require('../api')

const router = Router()

router.use(cors())

// Make API Routes
if (routes) {
  
  routes.forEach(route => {

    if (route.method === 'GET') {
      router.get(route.path, (req, res) => {
        const { code, data } = route.logic(req)
        res.status(code).send(data)
      })
    }

    if (route.method === 'POST') {
      router.post(route.path, (req, res) => {
        const { code, data } = route.logic(req)
        res.status(code).send(data)
      })
    }

    if (route.method === 'DELETE') {
      router.delete(route.path, (req, res) => {
        const { code, data } = route.logic(req)
        res.status(code).send(data)
      })
    }

  })

}

// Make Docs API GET Route
router.get('/docs-data', (req, res) => {
  res.send({
    name: config.name,
    description: config.description,
    routes
  })
})

// Make Docs
router.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname + '/docs.html'))
})

module.exports = router