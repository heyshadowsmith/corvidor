const chokidar = require('chokidar')
const watcher = chokidar.watch('routes', {ignored: /[\/\\]\./, persistent: true})
const generate = require('./generate')

function regenerate() {
  watcher
  .on('add', () => {
    generate()
  })
  .on('unlink', () => {
    generate()
  })
  .on('change', () => {
    generate()
  })
}

regenerate()

module.exports = regenerate