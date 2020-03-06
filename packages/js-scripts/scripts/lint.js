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

const getCommaSeparated = (string) => string.replace(/\|/g, ',');

const findFilesByExtension = async (extension) => {
  return await execa('find', [
    `./${sourceDir}`,
    '-type',
    'f',
    '-name',
    `*.${extension}`
  ])
}

const hasFileTypes = async (extensions) => {
  let hasFileType = false

  const splittedExtensions = extensions.split('|')

  for (const extention of splittedExtensions) {
    if(!hasFileType) {
      const { stdout: foundFiles} = await findFilesByExtension(extention)
      hasFileType= Boolean(foundFiles)
    }
  }

  return hasFileType
}

const tasks = new Listr(
  [
    {
      title: `Formatting ${otherFilesExtensions} (Prettier)`,
      task: async () => {
        const hasOtherFilesExtensions = await hasFileTypes(otherFilesExtensions)

        if (!hasOtherFilesExtensions) {
          console.log(chalk.yellow(`No files of type ${otherFilesExtensions} were found`))
          return undefined 
        }

        return execa('prettier', [
          `${sourceDir}/**/*.{${getCommaSeparated(otherFilesExtensions)}}`,
          isCIEnvironment ? '--check' : '--write',
          '--loglevel',
          'warn',
        ])
      },
    },
    {
      title: `Formatting ${jsExtensions}`,
      task: () =>
        new Listr([
          {
            title: 'Prettier',
            task: () =>
              execa('prettier', [
                `${sourceDir}/**/*.{${getCommaSeparated(jsExtensions)}}`,
                isCIEnvironment ? '--check' : '--write',
                '--loglevel',
                'warn',
              ]),
          },
          {
            title: 'ESLint',
            task: () =>
              execa('eslint', [
                `${sourceDir}`,
                ...jsExtensionsArray,
                ...(isCIEnvironment ? [] : ['--fix']),
              ]),
          },
        ]),
    },
    {
      title: `Formatting ${cssExtensions} (StyleLint)`,
      task: async () => {
        const hasCSS = await hasFileTypes(cssExtensions)

        if (!hasCSS) {
          console.log(chalk.yellow(`No files of type ${cssExtensions} were found`))
          return undefined
        }

        return new Listr([
          {
            title: 'Prettier',
            task: () =>
              execa('prettier', [
                `${sourceDir}/**/*.{${getCommaSeparated(cssExtensions)}}`,
                isCIEnvironment ? '--check' : '--write',
                '--loglevel',
                'warn',
              ]),
          },
          {
            title: 'Stylelint',
            task: () =>
              execa('stylelint', [
                `${sourceDir}/**/*.(${cssExtensions})`,
                ...(isCIEnvironment ? [] : ['--fix']),
              ]),
          },
        ])
      },
    },
  ],
  { concurrent: true }
);

tasks.run().catch((err) => {
  console.log(chalk.red(err.stderr || err.stdout));
  process.exit(1);
});
