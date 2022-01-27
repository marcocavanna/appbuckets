const path = require('path');
const fse = require('fs-extra');


/* --------
 * Build Paths
 * -------- */
const rootPath = path.resolve(__dirname, '..');
const packagePath = process.cwd();
const buildPath = path.resolve(packagePath, './build');
const srcPath = path.resolve(packagePath, './src');
const templatePath = path.resolve(buildPath, './template');


/* --------
 * Get PackageJSON
 * -------- */
const packageJson = JSON.parse(fse.readFileSync(path.resolve(packagePath, 'package.json'), 'utf-8'));


/* --------
 * Build Templates Folder
 * -------- */
function run() {

  // ----
  // Make Build Directory
  // ----
  fse.mkdirpSync(templatePath);


  // ----
  // Build PackageJSON file
  // ----
  const {
    templateScripts: scripts,
    dependencies,
    devDependencies,
    browserslist,
    scripts: skippedScripts,
    ...packageData
  } = packageJson;

  fse.writeFileSync(
    path.join(buildPath, 'package.json'),
    JSON.stringify(packageData, null, 2)
  );


  // ----
  // Build JSON template file
  // ----
  /** Fix Eslint Dependencies */
  [
    [ '@typescript-eslint/eslint-plugin', '4.33.0' ],
    [ '@typescript-eslint/parser', '4.33.0' ],
    [ 'eslint', '^7.11.0' ],
    [ 'eslint-config-airbnb-typescript', '16.1.0' ],
    [ 'eslint-plugin-import', '2.25.4' ],
    [ 'eslint-plugin-jsx-a11y', '6.5.1' ],
    [ 'eslint-plugin-react', '7.28.0' ],
    [ 'eslint-plugin-react-hooks', '4.3.0' ]
  ].forEach(([ pkgName, version ]) => {
    devDependencies[pkgName] = version;
  });

  fse.writeFileSync(
    path.join(buildPath, 'template.json'),
    JSON.stringify({
      package: {
        scripts,
        dependencies,
        devDependencies,
        browserslist
      }
    }, null, 2)
  );


  // ----
  // Build the TSConfig JSON file
  // ----
  fse.writeFileSync(
    path.join(templatePath, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target                          : 'ES5',
        lib                             : [ 'dom', 'dom.iterable', 'esnext' ],
        allowJs                         : true,
        skipLibCheck                    : true,
        esModuleInterop                 : true,
        allowSyntheticDefaultImports    : true,
        strict                          : true,
        noImplicitAny                   : true,
        noImplicitReturns               : true,
        noUnusedLocals                  : true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch      : true,
        importHelpers                   : true,
        downlevelIteration              : true,
        module                          : 'esnext',
        moduleResolution                : 'node',
        resolveJsonModule               : true,
        isolatedModules                 : true,
        noEmit                          : true,
        jsx                             : 'react-jsx'
      },
      include        : [ 'src' ]
    }, null, 2)
  );


  // ----
  // Copy Files
  // ----
  fse.copySync(
    path.resolve(rootPath, 'LICENSE'),
    path.resolve(buildPath, 'LICENSE')
  );

  [ '.editorconfig', '.eslintrc.js', '.eslintignore' ].forEach((file) => {
    fse.copySync(
      path.resolve(rootPath, file),
      path.resolve(templatePath, file)
    );
  });

  [
    '.dockerignore',
    'craco.config.js',
    'default.conf',
    'Dockerfile',
    'gitignore',
    'postcss.config.js'
  ].forEach((file) => {
    fse.copySync(
      path.resolve(packagePath, file),
      path.resolve(templatePath, file)
    );
  });


  // ----
  // Build Template Directory
  // ----
  fse.copySync(srcPath, path.join(templatePath, 'src'));
  fse.copySync(path.join(packagePath, 'public'), path.join(templatePath, 'public'));

}


run();
