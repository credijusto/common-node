const execa = require('execa');
const Listr = require('listr');

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

console.log(' 🍃 Linting code ♻️\n');

const tasks = new Listr(
  [
    {
      title: `Formatting with Prettier (${otherFilesExtensions})`,
      task: () => execa('prettier', [
        `${sourceDir}/**/*.{${otherFilesExtensions.replace(/\|/g, ',')}}`,
        isCIEnvironment ? '--check' : '--write',
        '--loglevel',
        'warn',
      ]),
    },
    {
      title: `Formatting with ESLint (${jsExtensions})`,
      task: () => execa('eslint', [
        `${sourceDir}`,
        ...jsExtensionsArray,
        ...(isCIEnvironment ? [] : ['--fix']),
      ]),
    },
    {
      title: `Formatting with StyleLint (${cssExtensions})`,
      task: () => execa('stylelint', [
        `${sourceDir}/**/*.(${cssExtensions})`,
        ...(isCIEnvironment ? [] : ['--fix']),
      ]),
    },
  ],
  { concurrent: true },
);

tasks.run().catch((err) => {
  console.error(err);
  process.exit(1);
});
