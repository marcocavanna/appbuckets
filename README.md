<p align="center">
    <img width="150" src="https://github.com/marcocavanna/appbuckets/raw/master/logo.png" alt="AppBuckets logo">
</p>

<h1 align="center">AppBuckets UI</h1>

<div align="center">

An Old School [React](https://reactjs.org/) UI Framework based on TypeScript and SCSS, fully customizable, with a dedicated [CreateReactApp](https://create-react-app.dev) template. Check it out [here](https://www.npmjs.com/package/cra-template-appbuckets-app)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/marcocavanna/appbuckets-ui/blob/master/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@appbuckets/react-ui/latest.svg)](https://www.npmjs.com/package/@appbuckets/react-ui)
[![npm downloads](https://img.shields.io/npm/dm/@appbuckets/react-ui.svg)](https://www.npmjs.com/package/@appbuckets/react-ui)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=marcocavanna/appbuckets-ui)](https://dependabot.com)

</div>

## Installation

AppBuckets UI is a [npm package](https://www.npmjs.com/package/@appbuckets/react-ui), available through [NPM](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install).

**The Latest stable release could be downloaded using your preferred package manager**

```sh
// with yarn
yarn install @appbuckets/react-ui

// with npm
npm install -S @appbuckets/react-ui
```

## Base Usage

A quick example of how can you use AppBuckets UI is the following:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the base CSS file
// using SCSS could be done to, check documentation below
import '@appbuckets/react-ui/styles/index.css';

// BucketTheme is the Theme Provider, use this to change the
// default prop of each single component.
// This Provider is not required, and it's optional
import BucketTheme from '@appbuckets/react-ui/BucketTheme';
import Box from '@appbuckets/react-ui/Box';
import Button from '@appbuckets/react-ui/Button';

// Obviously, you could import all components in one statement,
// keeping in mind that the following statements would include
// all source files into your build.
// This could slow down your first page load
// import { BucketTheme, Button, Box } from '@appbuckets/react-ui';


function App() {
  return (
    <Box textAlign='center' mt={8}>
      <Button
        primary
        icon={'rocket'}
        content={'Launch to the Moon'}
        tooltip={'Write wonderful Code'}
      />
    </Box>
  );
}

ReactDOM.render(
  <BucketTheme>
    <App />
  </BucketTheme>,
  document.getElementById('root')
);
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/reactbucket-starter-rshi0)

## Docs

### Components Demo and Examples

Full documentation is still to write.

### Storybook

To view Storybook download repo and launch `yarn start:storybook`.

Storybook has been used to check the develop process, it is not fully documented and components doesn't have all style and props table.

## Use with `create-react-app` template

A new template has been released. It won't contain only `@appbuckets/react-ui` package (fully configured to work out of the box), but it contains also two additional module called `@appbuckets/app-router`
and `@appbuckets/react-app-client`. Unfortunately they are not documented yet, but are two powerful tools to help you build new WebApp with routing and Auth Client.

To create a new React App using `create-react-app` and this template open the terminal and write

```shell
npx create-react-app <my-app-name> --template appbuckets-app
```

This template will replace `react-script` with `@craco` to use SCSS style instead CSS, as described below.

## Using SCSS Styles

The source files that define the style of AppBuckets UI can be used in any project, but with some tweaks. PostCSS must be used to recompile the style correctly without errors. AppBuckets UI uses a number of plugins, which are essential primarily for redefining and repositioning media queries.

**PAY ATTENTION** You cannot use `postcss@^8` with this methods.

The plugins used by AppBuckets UI are:

- `postcss-import`
- `postcss-momentum-scrolling`
- `postcss-merge-rules`
- `postcss-import-url`
- `postcss-discard-duplicates`
- `postcss-sort-media-queries`
- `postcss-single-charset`
- `postcss-discard-comments` in **production** mode only
- `postcss-single-line` in **production** mode only
- `autoprefixer`
- `css-declaration-sorter` in **production** mode only
- `cssnano` in **production** mode only

Instead of having to manually include individual plugins within the `postcss.config.js` file, you can download an additional repository that includes the configuration necessary to build the stylesheet.

```shell
# Using YARN
yarn add -D @appbuckets/postcss-appbuckets-react-ui

# Using NPM
npm install -D @appbuckets/postcss-appbuckets-react-ui
```

and used the `getPostCSSPlugins` function in your `postcss.config.js`:

```javascript
const { getPostCSSPlugins } = require('@appbuckets/postcss-appbuckets-react-ui');

module.exports = {
  plugins: [
    ...getPostCSSPlugins()
  ]
}
```

A configuration object could be passed to the function to adjust settings or exclude some plugins. Don't exclude plugins from compiling unless you really need them.

The configuration object can have one or more of the following options:

| Property               | Type                                              | Description                                                         |
|------------------------|:-------------------------------------------------:|:--------------------------------------------------------------------|
| `browserslist`         | `{ development: string[], production: string[] }` | Override default BrowsersList in `development` or `production` mode |
| `cssDeclarationSorter` | `alphabetical` - `smacss` - `concentric-css`      | Set declaration sort order. Default is `alphabetical`               |
| `exclude`              | `string[]`                                        | Exclude some plugin from build                                      |
| `mediaQueriesSorting`  | `mobile-first` - `desktop-first`                  | Set media queries order. Default is `mobile-first`                  |
| `mode`                 | `development` - `production`                      | Set the build mode. If none the NODE_ENV variable will be used      |

### Use Style in combination with Create React App

Unfortunately react-script does not allow you to override or change the app creation settings until you use the eject function. If you don't want to use the eject function you will have to use an external dependency, called **craco** to add the necessary plugins

#### 1. Install Craco Package

```shell
# Using YARN
yarn add -D @craco/craco

# Using NPM
npm install -D @craco/craco
```

#### 2. Replace package.json Scripts

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

#### 3. Add the `craco.config.js`

```javascript
const { getPostCSSPlugins } = require('@appbuckets/postcss-appbuckets-react-ui');

module.exports = {
  /** Extends PostCSS Plugins to Build AppBuckets UI Style */
  style: {
    postcss: {
      mode   : 'extends',
      plugins: [
        ...getPostCSSPlugins()
      ]
    }
  }
};

```

## TODO

- [ ] Optimize to use with SSR
- [ ] Optimize Icon library
- [ ] Write Docs and Demos
- [ ] Complete Tests
- [ ] Refactor Storybook
- [ ] Try to remove all possible external dependencies

## Contributing

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements.

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
