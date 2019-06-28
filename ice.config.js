const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
  entry: 'src/index.jsx',
  publicPath: './',
  plugins: [
    [
      'ice-plugin-fusion',
      {
        themePackage: '@icedesign/theme'
      }
    ],
    [
      'ice-plugin-moment-locales',
      {
        locales: ['zh-cn']
      }
    ]
  ],
  // 3. 自定义 webpack 配置
  chainWebpack: config => {
    // 通过 webpack-chain 形式修改 webpack 配置
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/good-analysis-total-components'))
      .set('_c', resolve('src/components'));
  }
};
