module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-native', 'module-resolver', 'import', 'prettier', 'flowtype'],
    extends: [
        '@react-native-community',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'plugin:react-native/all',
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            tsx: true,
            ts: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        semi: 'off',
        'no-unused-vars': 'off',
        'react-native/no-inline-styles': 'off',
        'no-alert': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
}
