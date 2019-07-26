const execa = require('execa');
const Listr = require('listr');
const chalk = require('chalk');

const paths = require('../config/paths');

const config = `${paths.ownPath}/config/.lintstagedrc`;

const tasks = new Listr([
  {
    title: 'Running lint staged',
    task: () => execa('lint-staged', ['--config', config]),
  },
]);

tasks.run().catch((err) => {
  console.log(chalk.red(err.stderr || err.stdout));
  process.exit(1);
});
