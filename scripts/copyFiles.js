/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('fast-glob');


/* --------
 * Build Paths
 * -------- */
const packagePath = process.cwd();
const buildPath = path.resolve(packagePath, './build');
const srcPath = path.resolve(packagePath, './src');


/**
 * Copy a file from source to build, checking
 * if file exists before copy.
 *
 * @param file
 * @returns {Promise<void>}
 */
async function includeFileInBuild(file) {
  /** Build paths */
  const sourcePath = path.resolve(packagePath, file);
  const destPath = path.resolve(buildPath, path.basename(file));

  /** Check file exists */
  if (!fse.existsSync(sourcePath)) {
    console.warn(`Skipping file ${sourcePath}. Doesn't exists`);
    return;
  }

  await fse.copy(sourcePath, destPath);
  console.log(`Copied ${sourcePath} to ${destPath}`);
}


/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Button from '@appbuckets/react-ui/Button' are tree-shakeable.
 */
async function createModulePackages({ from, to }) {
  /** Get all main directories */
  const directoryPackages = glob.sync('*/index.{js,ts,tsx}', { cwd: from }).map(path.dirname);

  /** Loop each directories */
  await Promise.all(
    directoryPackages.map(async (dirName) => {
      /**
       * Check the Module File Entry
       * --
       * When writing a module entry named index.ts to export module
       * without doing any other code, rollup won't transpile it.
       * To solve the submodule package entries must check if the index.js
       * file compiled exists.
       * If file doesn't exists, check an entry with same name as parent dir.
       * The typings file must have the same name, but with .d.ts extension as well
       */
      const mainFileName = fse.existsSync(path.join(to, dirName, 'index.js'))
        ? 'index.js'
        : `${dirName}.js`;

      const mainDeclarationExists = fse.existsSync(path.join(to, dirName, 'index.d.ts'));

      /** Do some check only if entry name is not index.js */
      if (mainFileName !== 'index.js') {
        /** Assert the resolved filename exists into directory, else skip */
        if (!fse.existsSync(path.join(to, dirName, mainFileName))) {
          console.warn(`Could not resolve entry point for ${dirName} folder. Skipping`);
          return;
        }
        /** Log the module resolution info */
        console.log(`Resolved ${dirName} to ${mainFileName}`);
      }

      const packageJsonPath = path.join(to, dirName, 'package.json');
      const typingsFilename = mainDeclarationExists
        ? 'index.d.ts'
        : mainFileName.replace(/\.js$/, '.d.ts');
      const typingsPath = path.join(to, dirName, typingsFilename);

      /** Build the new package */
      const modulePackage = {
        sideEffects: false,
        module     : `../esm/${dirName}/${mainFileName}`,
        main       : `./${mainFileName}`,
        types      : `./${typingsFilename}`
      };

      const [ typingsExist ] = await Promise.all([
        /** Check typings exists */
        fse.pathExists(typingsPath),
        /** Write the package.json */
        fse.writeFile(packageJsonPath, JSON.stringify(modulePackage, null, 2))
      ]);

      if (!typingsExist) {
        throw new Error(`index.d.ts for ${dirName} is missing. Path: '${typingsPath}'`);
      }

      return packageJsonPath;
    })
  );
}


/**
 * Create the main package file
 */
async function createPackageFile() {
  /** Get and Parse the package.json file */
  const {
    scripts,
    devDependencies,
    workspaces,
    ...pkgData
  } = JSON.parse(await fse.readFile(path.resolve(packagePath, './package.json'), 'utf-8'));

  /** Build new package.json */
  const newPackage = {
    ...pkgData,
    private: false,
    ...(pkgData.main
      ? {
        main  : './index.js',
        module: './esm/index.js'
      }
      : {}),
    types: './index.d.ts'
  };

  /** Write into destination */
  const targetPath = path.resolve(buildPath, './package.json');
  await fse.writeFile(
    targetPath,
    JSON.stringify(newPackage, null, 2),
    'utf-8'
  );

  console.log(`Created package.json in ${targetPath}`);

  return newPackage;
}


async function run() {
  try {
    /** Create the Package */
    const packageDate = await createPackageFile();

    /** Include the ReadME */
    await Promise.all([
      // Use the main readme for react-bucket core
      packageDate.name === '@appbuckets/react-ui' ? '../../README.md' : './README.md',
      '../../CHANGELOG.md',
      '../../LICENSE',
      './styles',
      './types'
    ].map((file) => includeFileInBuild(file)));

    /** Remove invalid d.ts files */
    // TODO: Check index.d.ts Purge Process
    // purgeInvalidTypes({ to: buildPath });

    /** Create single file package */
    await createModulePackages({ from: srcPath, to: buildPath });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
