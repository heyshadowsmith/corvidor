const { writeFileSync } = require('fs')

function generateCorvidorJson(name, description, author, path) {
  const content = 
`{
  "name": "${name}",
  "description": "${description}",
  "author": "${author}"
}`

  writeFileSync(`${path}/.corvidor/corvidor.json`, content)

}

module.exports = generateCorvidorJson