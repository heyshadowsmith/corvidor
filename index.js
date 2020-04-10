#!/usr/bin/env node
const path = require('path')
const ncp = require('ncp').ncp
const cwd = process.cwd()
 
ncp(path.join(__dirname, 'config'), 'test', (error) => {

 if (error) {
   return console.error(error)
 }

 console.log('Corvidor API succesfully created')

})