/* --------
 * Import Node Utilities
 * -------- */
const path = require('path');
const { writeFileSync, existsSync } = require('fs');


/* --------
 * Import Compiler Utilities
 * -------- */
const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');

const postcss = require('postcss');
const { getPostCSSPlugins } = require('../packages/postcss-appbuckets-react-ui');


/* --------
 * Set Path Helpers
 * -------- */
const sourceDir = (...args) => path.resolve(process.cwd(), 'styles', ...args);


/* --------
 * Declare the Function to Build SASS and to use PostCSS
 * -------- */
function buildCSSFile(filenameSrc, filenameDest) {
  /** Build the Source File */
  const fileSrc = sourceDir(`${filenameSrc}.scss`);

  /** Check Dir exists */
  if (!existsSync(fileSrc)) {
    global.console.log(`Skipping SCSS Compile for package : ${sourceDir(filenameSrc)}`);
    return;
  }

  /** Set file Paths */
  const fileDest = sourceDir(`${filenameDest}.css`);

  /** Return a Promise with Compiler Result */
  return new Promise((resolve, reject) => {
    /** Start build */
    global.console.log(`[${filenameSrc}] : Start building '${
      path.relative(__dirname, fileSrc)
    }' to '${
      path.relative(
        __dirname,
        fileDest
      )
    }'`);
    /** Render the SCSS File */
    sass.render({
      /** Set the source file */
      file: fileSrc,
      /** Add the package importer to use ~ */
      importer: packageImporter(),
      /** Set the out file to use SourceMap */
      outFile    : fileDest,
      outputStyle: 'expanded'
    }, (error, result) => {
      /** If an error occurred reject the build promise */
      if (error) {
        return reject({
          type: 'sass-error',
          error
        });
      }

      global.console.log(`[${filenameSrc}] : Compiled SCSS to CSS`);

      /** Pass the result to the PostCSS Processor */
      return postcss(getPostCSSPlugins())
        .process(result.css, {
          from: fileSrc,
          to  : fileDest
        })
        .then((postCSSResult) => {
          global.console.log(`[${filenameSrc}] : Processed CSS with PostCSS`);
          /** Save Compiled File */
          try {
            /** Save CSS */
            writeFileSync(fileDest, postCSSResult.css);
            global.console.log(`[${filenameSrc}] : File Written`);
          }
          catch (e) {
            return reject({
              type : 'write-error',
              error: e
            });
          }
        })
        .catch((postCSSError) => {
          return reject({
            type: 'postcss-error',
            postCSSError
          });
        });
    });
  });
}


/* --------
 * Compile Files
 * -------- */
const entries = {
  index: 'index'
};

async function build() {

  const buildsPromises = [];

  Object.keys(entries).forEach((filenameSrc) => {
    buildsPromises.push(
      buildCSSFile(filenameSrc, entries[filenameSrc])
    );
  });

  await Promise.all(buildsPromises);
}

(async () => {
  try {
    global.console.log(`Start building ${Object.keys(entries).length} files`);
    await build();
  }
  catch (e) {
    global.console.log('Error : ');
    global.console.log(e);
    process.exit(1);
  }
})();
