#!/usr/bin/env node
const { program } = require('commander')
const { prompt } = require('inquirer')
const { camelCase } = require('lodash')
const { writeFileSync } = require('fs')
const path = require('path')
const ncp = require('ncp').ncp
const cwd = process.cwd()

program
  .version('1.0.5')
  .description('Corvidor is used to easily get a serverless API project up-and-running.')

program
  .command('create-api [name]')
  .alias('api')
  .description('Scaffold a Corvidor API project.')
  .action(name => {
    if (name) {
      ncp(path.join(__dirname, 'config'), `${cwd}/${name}`, (error) => {

        if (error) {
          return console.error(error)
        }
       
        console.log(`Corvidor API succesfully created in ${name}.`)
       
      })
    } else {
      ncp(path.join(__dirname, 'config'), cwd, (error) => {

        if (error) {
          return console.error(error)
        }
       
        console.log('Corvidor API succesfully created.')
       
      })
    }
  })

  program
  .command('create-route')
  .alias('route')
  .description('Create a new Corvidor API route.')
  .action(() => {
    prompt([
      { type: 'input', message: "What's the name of this API route?", name: "name" },
      { type: 'input', message: "Describe this API route.", name: "description" },
      { type: 'list', message: "Pick the API route's method:", name: 'method', choices: [
        'GET',
        'POST',
        'DELETE'
      ]},
      { type: 'input', message: "What's the API route's path?", name: 'path' }
    ])
    .then(({ name, description, method, path }) => {
      const content = `module.exports = {\n\tname: '${name}',\n\tdescription: '${description}',\n\tmethod: '${method}',\n\tpath: '${path}',\n\tqueries: [],\n\tlogic(req) {}\n}`
  
      const fileName = `${camelCase(name)}.js`
      try {
        writeFileSync(`${cwd}/routes/${fileName}`, content)
        console.log(`Corvidor API route and ${fileName} file successfully created in routes.`)
      }
      catch(error) {
        console.log('Hmmm... this failed. Be sure you are in the root of your project before running corvidor create-route.')
      }
    })
  })

program.parse(process.argv)