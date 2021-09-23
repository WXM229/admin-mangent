const { VueLoaderPlugin} = require('vue-loader')

module.exports = {
  module: {
    rules: [
      {
        test: /.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: false // 热加载 但是没有实验出有什么效果
        }
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
