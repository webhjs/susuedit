/*
 * @Description: webpack配置
 * @Author bianpengfei
 * @create 2022/4/10 17:48
 */
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { LIB_HOME, IS_PRO, ROOT_PATH, IS_LIB, LIB_OUTPUT, APP_OUTPUT } = require('./build/utils')


const publicPath = IS_PRO ? './' : './'
const outputDir = IS_LIB ? LIB_OUTPUT : APP_OUTPUT

/**
 * 动态的插入ejs html
 * @type {{css: *[], external: string[], title: string, script: string[]}}
 */
const inject = {
  external: {
    // 'element-ui': 'ELEMENT'
  },
  minify: false, // 是否压缩html
  gzip: false, // 是否开启gzip
  script: [],
  css: [],
  dll: [], // dll
  title: '曼荼罗电子病历编辑器'
}

module.exports = {
  devServer: {
    port: 2829,
    host: '0.0.0.0',
    contentBase: [`${ROOT_PATH}/public`, `${ROOT_PATH}/src/bse`]
  },
  publicPath,
  assetsDir: 'static',
  outputDir,
  productionSourceMap: false,
  css: {
    extract: (() => {
      return IS_PRO
    })(),
    sourceMap: !IS_PRO // 是否开启 CSS source map  这里开发环境下开启
  },

  runtimeCompiler: true,

  lintOnSave: false,

  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.join(ROOT_PATH, 'src/libs/style/app/variables.scss'),
        path.join(ROOT_PATH, 'src/libs/style/app/mixin.scss')
      ]
    }
  },

  chainWebpack: config => {
    if (IS_PRO) {
      // 生产环境
      if (process.argv.includes('--report')) {
        config.plugin('bundleAnalyzerPlugin').use(BundleAnalyzerPlugin)
      }
      // 设置去除console
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })

      config.entryPoints.get('app').clear().add(path.join(ROOT_PATH, 'src/main.js'))
      // .add('@bianpengfei/utils')

      if (IS_LIB) {
        // 库模式
        config.output
          .libraryTarget('umd')
          .libraryExport('default')
          // .library('BSE')
          .umdNamedDefine(true)
          .globalObject("typeof self !== 'undefined' ? self : this")

        config.externals(inject.external)
        // config.plugin('bundleAnalyzerPlugin').use(BundleAnalyzerPlugin)

        // 打包成 base64
        config.module
          .rule('fonts')
          .use('url-loader')
          .tap(options => {
            options.limit = undefined
            return options
          })
          .end()
          .end()
          .rule('images')
          .use('url-loader')
          .tap(options => {
            options.limit = undefined
            return options
          })
          .end()
          .end()
          .rule('media')
          .use('url-loader')
          .tap(options => {
            options.limit = undefined
            return options
          })
      } else {
        // 非库模式
        config.plugin('html').tap(args => {
          args[0].script = inject.script
          args[0].css = inject.css
          args[0].title = inject.title
          args[0].minify = inject.minify
          return args
        })

        config.plugin('copyLibPlugin').use(CopyPlugin, [
          [
            {
              from: `${LIB_HOME}/theme`,
              to: `${outputDir}/theme`,
              toType: 'dir',
              ignore: [
                '.DS_Store',
                {
                  glob: 'index.html',
                  matchBase: false
                }
              ]
            }
          ]
        ])

        config.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            }
          }
        })
      }
    } else {
      // 开发环境 .entryPoints.delete('app')
      config.entry('iframe').add(path.resolve(LIB_HOME, 'theme/index.js'))
      config
        .plugin('htmlWebpackPluginIframe')
        .use(HtmlWebpackPlugin, [
          {
            chunks: ['chunk-vendors', 'iframe'],
            filename: 'iframe.html',
            hash: true,
            template: path.resolve(ROOT_PATH, 'public/iframe.html')
          }
        ])
        .end()
        .plugin('html')
        .tap(args => {
          args[0].chunks = ['chunk-vendors', 'app']
          args[0].inject = true
          args[0].filename = 'index.html'
          return args
        })
    }

    /*****************开发和生产环境都生效**********************/
    config.resolve.alias
      .set('@root', ROOT_PATH)
      .set('@', `${ROOT_PATH}/src`)
      .set('@libs', `${ROOT_PATH}/src/libs`)
      .set('@bse', LIB_HOME)
      .set('~@', `${ROOT_PATH}/src`)
    config.resolve.symlinks(true) // 修复HMR
    config.plugins.delete('prefetch').delete('preload')

    config.resolve.mainFields.add('main').add('module')

    config
      .plugin('definePlugin')
      .use(webpack.DefinePlugin, [
        {
          PUBLIC_URL: JSON.stringify(String(publicPath)) // 所有加载js文件动态前缀
        }
      ])
      .end()
      .plugin('providerPlugin')
      .use(webpack.ProvidePlugin, [
        {
          // $BUtils: '@bianpengfei/utils'
        }
      ])
  },

  configureWebpack: config => {
    // config.entry = {
    //   iframe: path.resolve(LIB_HOME, 'theme/index.css')
    // }
    //  config.entry('iframe').add(path.resolve(LIB_HOME, 'theme/index.css')).end()
    // 通用配置
    // new webpack.ProvidePlugin({
    //   _: 'lodash',
    // }),
    //
    // if (IS_LIB) {
    //   config.entry = `${LIB_HOME}/main.js`
    //   config.output = {
    //     ...config.output,
    //     libraryTarget: 'umd',
    //     libraryExport: 'default',
    //     library: 'BSE',
    //     umdNamedDefine: true,
    //     globalObject: "typeof self !== 'undefined' ? self : this"
    //   }
    // }
  }
}
