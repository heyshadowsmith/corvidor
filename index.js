#!/usr/bin/env node
const { program } = require('commander')
const { prompt } = require('inquirer')
const { camelCase } = require('lodash')
const { writeFileSync } = require('fs')
const path = require('path')
const ncp = require('ncp').ncp
const cwd = process.cwd()
const generatePackageJson = require('./generators/packageJson')
const generateReadme = require('./generators/readme')
const generateCorvidorJson = require('./generators/corvidorJson')

program
  .version('1.0.4')
  .description('Corvidor is used to easily get a serverless API project up-and-running.')

program
  .command('create-api')
  .alias('api')
  .description('Scaffold a Corvidor API.')
  .action(() => {

    prompt([
      { type: 'confirm', message: "Install your API in your current directory?", default: false, name: "location" },
      { type: 'input', message: "What's the name of your API?", name: "name" },
      { type: 'input', message: "Describe your API.", name: "description" },
      { type: 'input', message: "What's your name?", name: 'author' }
    ])
    .then(({ location, name, description, author }) => {
      const directory = name.toLowerCase().split(' ').join('-')

      if (location) {
        ncp(path.join(__dirname, 'config'), cwd, (error) => {
          
          if (error) {
            return console.error(error)
          }
          
          generatePackageJson(directory, description, author, cwd)
          generateReadme(name, description, cwd)
          generateCorvidorJson(name, description, author, cwd)

          console.log(`\n${name} has been succesfully created in your current directory.\n\ncd ${directory} && npm i && npm run dev`)

        })
      } else {
        ncp(path.join(__dirname, 'config'), `${cwd}/${directory}`, (error) => {

          if (error) {
            return console.error(error)
          }

          generatePackageJson(directory, description, author, `${cwd}/${directory}`)
          generateReadme(name, description, `${cwd}/${directory}`)
          generateCorvidorJson(name, description, author, `${cwd}/${directory}`)

          console.log(`\n${name} has been succesfully created.\n\ncd ${directory} && npm i && npm run dev`)
        })
      }
    })
  })

  program
  .command('create-route')
  .alias('route')
  .description('Create a new Corvidor API route.')
  .action(() => {
    prompt([
      { type: 'input', message: "What's the name of your new API route?", name: "name" },
      { type: 'input', message: "Describe your API route.", name: "description" },
      { type: 'list', message: "Pick your API route's method:", name: 'method', choices: [
        'GET',
        'POST',
        'DELETE'
      ]},
      { type: 'input', message: "What's your API route's path?", name: 'path' }
    ])
    .then(({ name, description, method, path }) => {
      const content = `module.exports = {\n\tname: '${name}',\n\tdescription: '${description}',\n\tmethod: '${method}',\n\tpath: '${path}',\n\tqueries: [],\n\tlogic(req) {}\n}`
  
      const fileName = `${camelCase(name)}.js`
      try {
        writeFileSync(`${cwd}/routes/${fileName}`, content)
        console.log(`Corvidor API route and ${fileName} file successfully created in routes.`)
      }
      catch(error) {
        console.log('Hmmm... this failed. Be sure you are in the root of your project before running "crvdr create-route".')
      }
    })
  })

program.parse(process.argv)

