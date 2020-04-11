const { writeFileSync } = require('fs')

function generatePackageJson(name, description, author, path) {
  const content = 
`{
  "name": "${name}",
  "version": "1.0.0",
  "description": "${description}",
  "scripts": {
    "dev": "npm run generate && nodemon .corvidor",
    "generate": "node .corvidor/regenerate/generate"
  },
  "author": "${author}",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chokidar": "^3.3.1",
    "nodemon": "^2.0.3"
  }
}`

  writeFileSync(`${path}/package.json`, content)

}

module.exports = generatePackageJson