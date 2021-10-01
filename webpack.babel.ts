import path from 'path'

module.exports = {
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './'),
      '@app': path.resolve(__dirname, './app'),
      '@resources': path.resolve(__dirname, './app/resources'),
      '@base': path.resolve(__dirname, './app/base'),
      '@configs': path.resolve(__dirname, './app/configs'),
      '@screens': path.resolve(__dirname, './app/screens'),
    },
  },
}
