module.exports = {
  extends: [
    '@cognite',
    'plugin:testing-library/react',
    'plugin:lodash/recommended',
    'plugin:testcafe/recommended',
  ],
  plugins: ['testing-library', 'lodash', 'testcafe', 'header'],
  rules: {
    'max-classes-per-file': ['off'],
    'lines-between-class-members': ['off'],
    'class-methods-use-this': ['off'],

    'react/jsx-props-no-spreading': ['off'],
    'react/static-property-placement': ['off'],
    'react/state-in-constructor': ['off'],

    'jest/expect-expect': ['off'],
    'jest/no-test-callback': ['off'],
    'jest/no-export': ['off'],

    'lodash/prefer-lodash-method': ['off'],
    'lodash/prop-shorthand': ['off'],
    'lodash/prefer-constant': ['off'],
    'lodash/prefer-is-nil': ['off'],
    'lodash/prefer-get': ['off'],
    'lodash/prefer-noop': ['off'],
    'lodash/prefer-lodash-typecheck': ['off'],
    'lodash/prefer-includes': ['off'],

    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    // ],
    '@typescript-eslint/no-unused-vars': ['off'],
    'no-console': ['off'],
    'header/header': [
      2,
      'line',
      [
        {
          pattern: ' Copyright \\d{4} Cognite AS',
          template: ` Copyright ${new Date().getFullYear()} Cognite AS`,
        },
      ],
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['select'],
      },
    ],
  },
};
