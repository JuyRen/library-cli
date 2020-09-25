module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 12
    },
    rules: {
        'no-console': ['off'],
        'no-unused-vars': ['warn'],
        'no-plusplus': ['off']
    }
};
