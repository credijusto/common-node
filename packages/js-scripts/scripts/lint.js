const chalk = require('chalk');
const spawn = require('cross-spawn');

process.on('unhandledRejection', (err) => {
  throw err;
});

const isCIEnvironment = process.env.CI === 'true';

const sourceDir = 'src';
const jsExtensions = 'js|jsx';
const cssExtensions = 'css|pcss|scss';
const otherFilesExtensions = 'html|mxd|json';

const jsExtensionsArray = jsExtensions
  .split('|')
  .reduce((exts, ext) => exts.concat(['--ext', ext]), []);

console.log(chalk.blue('Running prettier...'));
const prettierProc = spawn.sync(
  'prettier',
  [
    `${sourceDir}/**/*.{${otherFilesExtensions.replace(/\|/g, ',')}}`,
    isCIEnvironment ? '--check' : '--write',
  ],
  { stdio: 'inherit' },
);
if (prettierProc.error) {
  console.error(prettierProc.error);
  process.exit(1);
} else {
  console.log(chalk.green('Prettier executed correctly'));
}

console.log(chalk.blue('Running eslint...'));
const eslintProc = spawn.sync(
  'eslint',
  [`${sourceDir}`, ...jsExtensionsArray, isCIEnvironment ? '--check' : '--fix'],
  { stdio: 'inherit' },
);
if (eslintProc.error) {
  console.error(eslintProc.error);
  process.exit(1);
} else {
  console.log(chalk.green('Eslint executed correctly'));
}

console.log(chalk.blue('Running stylelint...'));
const stylelintProc = spawn.sync(
  'stylelint',
  [`${sourceDir}/**/*.(${cssExtensions})`, isCIEnvironment ? '--check' : '--fix'],
  { stdio: 'inherit' },
);
if (stylelintProc.error) {
  console.error(stylelintProc.error);
  process.exit(1);
} else {
  console.log(chalk.green('Stylelint executed correctly'));
}
