const Version  = new Date().getTime();
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    port: 8000,
    // host: 'localhost',
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
  lintOnSave: false,
  chainWebpack: config => {
    config.output.filename(`js/[name].${Version}.js`).end();
    config.output.chunkFilename(`js/[id].${Version}.js`).end();
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  } // 解决缓存问题
};
