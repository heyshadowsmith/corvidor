const fs = require('fs')

// Add all new routes
function generate() {
  fs.readdir('routes', (error, files) => {

    let requires = '// This code is automatically generated by the framework'
    
    files.forEach((file, index) => {
      fileName = file.replace('.js', '')
      files[index] = fileName
      requires =  `${requires}\nconst ${fileName} = require('../../routes/${fileName}')`
    })
  
    fs.writeFile('.corvidor/api/index.js', 
    `${requires}\n\nmodule.exports = [${files}]`, (error) => {
      if (error) {
        console.log(error)
      }
    })
    
  })
}

generate()

module.exports = generate