#!/usr/bin/env node
const ncp = require('ncp').ncp
const cwd = process.cwd()
 
ncp('config', cwd, (error) => {

 if (error) {
   return console.error(error)
 }

 console.log('Corvidor API succesfully created')

})