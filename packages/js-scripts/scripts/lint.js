const execa = require('execa');
const Listr = require('listr');
const chalk = require('chalk');

process.on('unhandledRejection', (err) => {
  throw err;
});

const isCIEnvironment = process.env.CI === 'true';

const sourceDir = 'src';
const jsExtensions = 'js|jsx';
const cssExtensions = 'css|pcss|scss';
const otherFilesExtensions = 'html|mdx|json';

const jsExtensionsArray = jsExtensions
  .split('|')
  .reduce((exts, ext) => exts.concat(['--ext', ext]), []);

console.log(chalk.green(' 🍃 Linting code ♻️\n'));

const getCommaSeparated = string => string.replace(/\|/g, ',');

const tasks = new Listr(
  [
    {
      title: `Formatting ${otherFilesExtensions} (Prettier)`,
      task: () => execa('prettier', [
        `${sourceDir}/**/*.{${getCommaSeparated(otherFilesExtensions)}}`,
        isCIEnvironment ? '--check' : '--write',
        '--loglevel',
        'warn',
      ]),
    },
    {
      title: `Formatting ${jsExtensions}`,
      task: () => new Listr([
        {
          title: 'Prettier',
          task: () => execa('prettier', [
            `${sourceDir}/**/*.{${getCommaSeparated(jsExtensions)}}`,
            isCIEnvironment ? '--check' : '--write',
            '--loglevel',
            'warn',
          ]),
        },
        {
          title: 'ESLint',
          task: () => execa('eslint', [
            `${sourceDir}`,
            ...jsExtensionsArray,
            ...(isCIEnvironment ? [] : ['--fix']),
          ]),
        },
      ]),
    },
    {
      title: `Formatting ${cssExtensions} (StyleLint)`,
      task: () => execa('stylelint', [
        `${sourceDir}/**/*.(${cssExtensions})`,
        ...(isCIEnvironment ? [] : ['--fix']),
      ]),
    },
  ],
  { concurrent: true },
);

tasks.run().catch((err) => {
  console.log(chalk.red(err.stderr || err.stdout));
  process.exit(1);
});
