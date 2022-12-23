/**
 * @Description:  打包iframe.css 基础
 * @Author bianpengfei
 * @create 2022/6/14 09:17
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Config = require('webpack-chain')
const cssnano = require('cssnano')
const { ROOT_PATH, LIB_HOME } = require('./utils')
const path = require('path')

module.exports = () => {
  const config = new Config()
  config.mode('production')
  config.resolve.alias
    .set('@root', ROOT_PATH)
    .set('@', `${ROOT_PATH}/src`)
    .set('@libs', `${ROOT_PATH}/src/libs`)
    .set('@bse', LIB_HOME)
    .set('~@', `${ROOT_PATH}/src`)
  config.module
    .rule('css')
    .test(/\.css$/)
    .use('mini-css-loader')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader('css-loader')
    .end()
    .use('postcss-loader')
    .loader('postcss-loader')
    .options({
      sourceMap: false,
      postcssOptions: {
        plugins: [
          require('autoprefixer')(),
          require('postcss-import')(),
          require('postcss-preset-env')(),

        ]
      }
    })
    .end()
    .end()
    .rule('scss')
    .test(/\.scss$/)
    .use('mini-scss-loader')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader('css-loader')
    .end()
    .use('postcss-loader')
    .loader('postcss-loader')
    .options({
      sourceMap: false,
      postcssOptions: {
        plugins: [
          require('autoprefixer')(),
          require('postcss-import')(),
          require('postcss-preset-env')(),
        ]
      }
    })
    .end()
    .use('sass-loader')
    .loader('sass-loader')
    .end()
    .end()
    .rule('images')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: undefined
    })
    .end()
    .end()
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: undefined
    })
    .end()
    .end()
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: undefined
    })

  config
    .plugin('miniCssExtractPlugin')
    .use(MiniCssExtractPlugin, [
      {
        filename: 'index.css',
        chunkFilename: '[id].[contenthash:10].css'
      }
    ])
    .end()
    .plugin('ProgressBarPlugin')
    .use(ProgressBarPlugin)

  config.optimization.minimize(true).minimizer([
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),
    new TerserPlugin({
      parallel: true
    })
  ])

  config.plugin('friendlyerrorswebpackplugin').use(FriendlyErrorsWebpackPlugin, [
    {
      compilationSuccessInfo: {
        messages: [`Finished compressing and packaging CSS files`],
        // notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
      },
      clearConsole: false,
      additionalFormatters: [],
      additionalTransformers: []
    }
  ])

  return config
}
