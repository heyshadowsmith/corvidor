const { Router } = require('express')
const path = require('path')
const cors = require('cors')

// Require HTTP request method routes
const routes = require('../api')

const router = Router()

router.use(cors())

// Make API Routes
if (routes) {
  
  routes.forEach(route => {

    if (route.method === 'GET') {
      router.get(route.path, (req, res) => {
        res.send(route.logic(req))
      })
    }

    if (route.method === 'POST') {
      router.post(route.path, (req, res) => {
        res.send(route.logic(req))
      })
    }

    if (route.method === 'DELETE') {
      router.delete(route.path, (req, res) => {
        res.send(route.logic(req))
      })
    }

  })

}

// Make Docs API GET Route
router.get('/docs-data', (req, res) => {
  res.send(routes)
})

// Make Docs
router.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname + '/docs.html'))
})

module.exports = router