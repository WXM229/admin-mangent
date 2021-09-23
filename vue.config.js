const Version  = new Date().getTime();
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
  },
  chainWebpack: config => {
    config.output.filename(`js/[name].${Version}.js`).end();
    config.output.chunkFilename(`js/[id].${Version}.js`).end();
  } // 解决缓存问题
}
