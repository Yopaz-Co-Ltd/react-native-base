import path from 'path'

module.exports = {
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, './'),
            '@app': path.resolve(__dirname, './app'),
            '@resources': path.resolve(__dirname, './app/resources'),
            '@base': path.resolve(__dirname, './app/base'),
            '@screens': path.resolve(__dirname, './app/screens'),
            '@api': path.resolve(__dirname, './app/api'),
        },
    },
}
