const spawn = require('cross-spawn');

const paths = require('../config/paths');

const config = `${paths.ownPath}/config/.lintstagedrc`;

const proc = spawn.sync('lint-staged', ['--config', config], {
  stdio: 'inherit',
});

if (proc.error) {
  console.error(proc.error);
  process.exit(proc.status);
}
