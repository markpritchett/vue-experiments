module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_URL
      }
    }
  },
  configureWebpack: config => {
    config.entry.app = process.env.NODE_ENV === "production" ? './src/main.js' : './src/main.development.js'
  }
}
