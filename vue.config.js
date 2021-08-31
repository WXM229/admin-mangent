module.exports = {
  devServer: {
    port: 8000,
    host: 'localhost',
    open: true,
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
