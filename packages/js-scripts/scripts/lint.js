'use strict'

const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const promisify = require('util').promisify
const glob = require('glob')
const prettierEslint = require('prettier-eslint')
const spawn = require('cross-spawn')
const prettierStylelint = require('@cesargdm/prettier-stylelint')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

process.on('unhandledRejection', err => {
  throw err
})

const paths = require('../config/paths')

const jsExtensions = 'js|jsx'
const cssExtensions = 'css|pcss|scss'

const formatJSFiles = () =>
  glob(`${paths.appPath}/src/**/*.?(${jsExtensions})`, (er, files) => {
    const promises = files.map(file => {
      const formatted = prettierEslint({
        filePath: file,
        eslintConfig: { extends: 'react-app' },
      })

      return writeFile(file, formatted)
    })

    Promise.all(promises)
      .then(() => {
        console.log(chalk.green('All js files formatted correctly'))
      })
      .catch(error => {
        console.log('Error formating files')
        console.error(error)
      })
  })

const formatsCSSFiles = () =>
  glob(`${paths.appPath}/src/**/*.?(${cssExtensions})`, (error, files) => {
    const formattings = files.map(file => {
      const formatted = prettierStylelint({
        filePath: file,
        stylelintConfig: {
          plugins: [require.resolve('stylelint-order')],
          rules: {
            'order/order': ['custom-properties', 'declarations'],
            'order/properties-alphabetical-order': true,
          },
        },
      })

      return formatted
    })

    Promise.all(formattings).then(writes => {
      const promises = writes.map((data, index) =>
        writeFile(files[index], data)
      )

      Promise.all(promises)
        .then(() => {
          console.log(chalk.green('All css files formatted correctly'))
        })
        .catch(error => {
          console.log('Error formating files')
          console.error(error)
        })
    })
  })

formatJSFiles()
formatsCSSFiles()
