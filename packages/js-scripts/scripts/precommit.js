const spawn = require('cross-spawn')
const lintStaged = require.resolve('lint-staged')

console.log()
console.log('PRECOMMITING...', process.args)
console.log()

const paths = require('../config/paths')

const config = `${paths.ownPath}/config/.lintstagedrc`

const proc = spawn.sync(lintStaged, ['--config', config], {
  stdio: 'inherit',
})

if (proc.status !== 0) {
  process.exit(proc.status)
}
