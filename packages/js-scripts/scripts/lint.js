'use strict'

const chalk = require('chalk')

const spawn = require('cross-spawn')

process.on('unhandledRejection', err => {
  throw err
})

const paths = require('../config/paths')
const eslintConfig = `${paths.ownPath}/config/.eslintrc.json`

const jsExtensions = 'js|jsx'
const cssExtensions = 'css|pcss|scss'

const eslintProc = spawn.sync('eslint', ['src/**/*.js', '--fix'], {
  stdio: 'inherit',
})

if (eslintProc.error) {
  process.error(eslintProc.error)
  process.exit(1)
} else {
  console.log(chalk.green('Eslint executed correctly'))
}

const stylelintProc = spawn.sync('stylelint', ['src/**/*.pcss', '--fix'], {
  stdio: 'inherit',
})

console.log(stylelintProc)

if (stylelintProc.error) {
  console.error(stylelintProc.error)
  process.exit(1)
} else {
  console.log(chalk.green('Stylelint executed correctly'))
}
