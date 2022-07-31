module.exports = {
  root         : true,
  parser       : '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
    project    : [ './tsconfig.json' ]
  },
  settings     : {
    react: {
      version: 'detect'
    }
  },
  plugins      : [
    'import',
    'react',
    'react-hooks',
    '@typescript-eslint/eslint-plugin'
  ],
  extends      : [
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended'
  ],
  rules        : {
    // Base Rules
    'array-bracket-spacing'            : [ 'error', 'always' ],
    'arrow-body-style'                 : [ 'off' ],
    'arrow-parens'                     : [ 'off' ],
    'consistent-return'                : [ 'off' ],
    'key-spacing'                      : [ 'off' ],
    'import/no-cycle'                  : [ 'off' ],
    'import/no-extraneous-dependencies': [ 'off' ],
    'import/prefer-default-export'     : [ 'off' ],
    'max-len'                          : [ 'error', { code: 130, ignoreUrls: true, ignoreStrings: true } ],
    'no-case-declarations'             : [ 'off' ],
    'no-console'                       : [ 'warn' ],
    'no-multiple-empty-lines'          : [ 'error', { max: 2, maxEOF: 0 } ],
    'no-nested-ternary'                : [ 'off' ],
    'no-param-reassign'                : [ 'error', { props: false } ],
    'no-useless-escape'                : [ 'off' ],
    'no-underscore-dangle'             : [ 'off' ],
    'object-curly-newline'             : [ 'error', { consistent: true } ],
    'padded-blocks'                    : [ 'off' ],
    'prefer-promise-reject-errors'     : [ 'off' ],

    // Strict Typescript file Rules
    '@typescript-eslint/consistent-type-imports': [ 'error' ],
    '@typescript-eslint/brace-style'            : [ 'error', 'stroustrup' ],
    '@typescript-eslint/comma-dangle'           : [ 'off' ],
    '@typescript-eslint/indent'                 : [ 'error', 2 ],
    '@typescript-eslint/naming-convention'      : [ 'off' ],
    '@typescript-eslint/no-redeclare'           : [ 'error', { builtinGlobals: false } ],
    '@typescript-eslint/no-throw-literal'       : [ 'off' ],
    '@typescript-eslint/no-unused-vars'         : [ 'warn' ],

    // JSX a11n
    'jsx-a11y/anchor-is-valid'                       : [ 'off' ],
    'jsx-a11y/no-noninteractive-element-interactions': [ 'off' ],
    'jsx-a11y/no-static-element-interactions'        : [ 'off' ],
    'jsx-a11y/click-events-have-key-events'          : [ 'off' ],

    // Strict React file Rules
    'react/destructuring-assignment'   : [ 'off' ],
    'react/jsx-boolean-value'          : [ 'off' ],
    'react/jsx-curly-brace-presence'   : [ 'error', { props: 'always', children: 'never' } ],
    'react/jsx-fragments'              : [ 'error', 'element' ],
    'react/jsx-key'                    : [ 'error', { checkKeyMustBeforeSpread: true } ],
    'react/jsx-one-expression-per-line': [ 'off' ],
    'react/jsx-props-no-spreading'     : [ 'off' ],
    'react/no-array-index-key'         : [ 'off' ],
    'react/no-unused-prop-types'       : [ 'off' ],
    'react/prop-types'                 : [ 'off' ],
    'react/require-default-props'      : [ 'off' ],
    'react/state-in-constructor'       : [ 'error', 'never' ],
    'react/static-property-placement'  : [ 'off' ]
  }
};
