const { writeFileSync } = require('fs')

function generateReadme(name, description, path) {
  const content = 
`# ${name}
${description}`

  writeFileSync(`${path}/README.md`, content)

}

module.exports = generateReadme