module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
        'react/forbid-prop-types': 0,
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }]
    }
};
