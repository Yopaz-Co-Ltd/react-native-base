module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@app': './app',
                    '@resources': './app/resources',
                    '@base': './app/base',
                    '@screens': './app/screens',
                    '@api': './app/api',
                },
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        ['@babel/plugin-proposal-decorators', {legacy: true}],
    ],
}
