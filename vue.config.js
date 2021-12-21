/**
 * vue.config基本配置
 */
const path = require('path');
const webpack = require('webpack');
const extraCookies = require('./src/common/cookies');
const isProduction = process.env.NODE_ENV === 'production';
let testAddress;
try {
  testAddress = JSON.parse(process.env.npm_config_argv).original.slice(2).toString();    
} catch (error) {
  testAddress = process.argv.slice(2).toString();
};

const targetAddress = testAddress ? `testAddress` : `本地mock服务地址`;

function addExtraCookies(cookies) {
  return Object.entries(extraCookies).reduce((cookies, [key, value]) => {
    let newCookie = `${key}=${value}`;
    if (cookies) {
      const regCookie = new RegExp(`(^| )(${key}=[^;]*)(;|$)`);

      if (cookies.match(regCookie)) {
        newCookie = cookies.replace(regCookie, `$1${newCookie}$3`);
      } else {
        newCookie += `; ${cookies}`;
      }
    }
    return newCookie;
  }, cookies);
}
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  outputDir: process.env.outputDir,
  publicPath:  process.env.publicPath,
  productionSourceMap: false,
  parallel: isProduction ? true : false,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(options => {
        return options;
      });
  },
  pages: {
    index: {
      entry: './src/main.ts'
    }
  },
  devServer: {
    proxy: {
      '/test': {
        target: !isProduction ? targetAddress : '',
        ws: true,
        changeOrigin: true,
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader(
            "Cookie",
            addExtraCookies(proxyReq.getHeader("Cookie") || "")
          );
        },
      }
    }
  },
  configureWebpack: config => {
    config.plugins.push(new webpack.DefinePlugin({
      'is_test': isTest
    }))
  }
}
