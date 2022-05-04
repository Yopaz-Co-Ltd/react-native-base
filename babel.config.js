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
                },
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
    ],
}
