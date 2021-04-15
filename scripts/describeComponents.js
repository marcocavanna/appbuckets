/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('fast-glob');
const docgen = require('react-docgen-typescript');
const { execSync } = require('child_process');


/* --------
 * Build Paths
 * -------- */
const cacheFilePath = path.resolve(__dirname, '.descriptorcache');
const rootPath = path.resolve(__dirname, '..');
const docsPath = path.resolve(rootPath, 'docs', 'src', 'pages', 'components');
const docsPages = path.resolve(rootPath, 'docs', 'pages', 'components');
const storiesFolder = path.resolve(rootPath, 'storybook', 'stories');

const sourcePath = path.resolve(process.cwd(), 'src');


/* --------
 * Assert Cache Exists
 * -------- */
if (!fse.existsSync(cacheFilePath)) {
  fse.writeFileSync(cacheFilePath, '{}');
}


/* --------
 * Get the Components Page Template
 * -------- */
const componentPageTemplate = fse.readFileSync(path.resolve(__dirname, '.componentpage'), 'utf-8');
const storiesTemplate = fse.readFileSync(path.resolve(__dirname, '.stories'), 'utf-8');


/* --------
 * Get the last commit hash for a file using GIT
 * -------- */
function getLastCommitHash(file) {
  return execSync(`git log -n 1 --pretty=format:%H ${path.join(sourcePath, file)}`).toString();
}

function isFileModified(file) {
  return !!execSync(`git diff ${path.join(sourcePath, file)}`).toString();
}

function anyToKebabCase(string) {
  return string
    .replace(/\B(?:([A-Z])(?=[a-z]))|(?:(?<=[a-z0-9])([A-Z]))/g, '-$1$2')
    .toLowerCase();
}


async function run() {

  /** Get all Components */
  const components = glob.sync('*/*.tsx', { cwd: sourcePath });

  /** Load the cache file */
  const cache = JSON.parse(fse.readFileSync(cacheFilePath, 'utf-8'));

  /** Init arrays to save data to log */
  const unmodifiedFiles = [];
  const generatedComponents = [];
  const emptyComponents = [];

  /** Loop each to produce JSON Data */
  components.forEach((componentPath) => {

    /** Get the dirname */
    const dirname = path.dirname(componentPath);
    const dirnameKebabCase = anyToKebabCase(dirname);

    /** Skip some folders */
    if ([ 'hooks', 'utils' ].includes(dirname)) {
      return;
    }

    // ----
    // Assert Navigation Files Exists
    // --
    // Check into NextJS Components Page if this page exists
    // if it doesn't, create the page programmatically
    // ----
    const pagePosition = path.join(docsPages, `${dirnameKebabCase}.tsx`);
    if (!fse.existsSync(pagePosition)) {
      const componentPage = componentPageTemplate.replace(/{{componentName}}/g, dirnameKebabCase);
      fse.writeFileSync(pagePosition, componentPage);
    }


    // ----
    // Assert Stories Exists
    // ----
    const storiesToOmit = [ 'BucketTheme', 'Column', 'Field', 'Form', 'Row' ];
    if (!storiesToOmit.includes(dirname)) {
      const storiesPosition = path.join(storiesFolder, `${dirname}.stories.tsx`);
      if (!fse.existsSync(storiesPosition)) {
        const stories = storiesTemplate.replace(/{{componentName}}/g, dirname);
        fse.writeFileSync(storiesPosition, stories);
      }
    }


    // ----
    // Assert Main Markdown File exists
    // --
    // Check into Next src Folder if markdown file exists
    // If it doesn't, create a new one
    // ----
    if (!fse.existsSync(path.join(docsPath, dirnameKebabCase))) {
      fse.mkdirpSync(path.join(docsPath, dirnameKebabCase));
    }

    const markdownPosition = path.join(docsPath, dirnameKebabCase, `${dirnameKebabCase}.md`);
    if (!fse.existsSync(markdownPosition)) {
      fse.writeFileSync(markdownPosition, [
        `# ${dirname}`,
        '',
        '<p class="description">Component Description Placeholder</p>',
        '',
        'Docs for this components is still to write',
        '',
        '## Props',
        '',
        `### \`<${dirname} />\``,
        '',
        `{{"props": "${dirname}"}}`
      ].join('\n'));
    }

    // ----
    // Create the Props Description
    // --
    // Before creating each file it checks if the last
    // commit differs from the previous script run
    // ----

    /** Get the last commit for a file */
    const lastCommit = getLastCommitHash(componentPath);
    const cachedCommit = cache[componentPath];

    /** If commit are the same, skip document generation */
    if (lastCommit === cachedCommit && !isFileModified(componentPath)) {
      unmodifiedFiles.push(componentPath);
      return;
    }

    /** Parse the component */
    const parsed = docgen.parse(path.join(sourcePath, componentPath), {
      /** Add custom component types */
      customComponentTypes: [ 'CreatableFunctionComponent', 'DropzoneComponent', '__type' ],
      /** Remove all HTML Props */
      propFilter: (prop) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
            return !declaration.fileName.includes('node_modules/@types/react');
          });

          return Boolean(hasPropAdditionalDescription);
        }

        return true;
      },
      /** Extract Enum */
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional : true
    });

    /** Show a warn on empty parsed file */
    if (!parsed.length) {
      emptyComponents.push(componentPath);
      return;
    }

    /** Process each parsed file to produce props.json file */
    parsed.forEach((component) => {
      /** Build the kebab-case name */
      const kebabCaseName = anyToKebabCase(component.displayName);

      /** Save the object has json files removing methods */
      const { methods, ...componentDoc } = component;

      /** Check the dir exists */
      const saveDir = path.resolve(docsPath, dirnameKebabCase, 'props');

      if (!fse.pathExistsSync(saveDir)) {
        fse.mkdirpSync(saveDir);
      }

      try {
        fse.writeFileSync(
          path.resolve(saveDir, `${kebabCaseName}.json`),
          JSON.stringify({
            filename: path.join(process.cwd().replace(`${rootPath}/`, ''), 'src', componentPath),
            ...componentDoc
          }, null, 2)
        );

        generatedComponents.push({ name: component.displayName, file: componentPath });

        cache[componentPath] = lastCommit || null;
      }
      catch (error) {
        console.error(`An error occurred while saving JSON file for component ${componentPath}`);
        console.error(error);
        process.exit(1);
      }
    });
  });

  /** Save the cache */
  fse.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));

  /** Write log */
  console.log('This file has not been modified. Props must not be updated:');
  console.log(unmodifiedFiles.join('\n'));
  console.log('\n');
  console.log('This file produced empty descriptor and was skipped:');
  console.log(emptyComponents.join('\n'));
  console.log('\n');
  console.log('Components Updated - Created');
  console.log(generatedComponents.map((c) => `${c.name} from ${c.file}`).join('\n'));

}

run();
