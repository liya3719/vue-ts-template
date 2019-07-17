/**
 * vue.config基本配置
 */
const buildUpload = require('./src/common/buildUpload');
const isProduction = process.env.NODE_ENV === 'production';
let testAddress, targetAddress;
try {
  testAddress = JSON.parse(process.env.npm_config_argv).original.slice(2).toString();    
} catch (error) {
  testAddress = process.argv.slice(2).toString();
};
let testServer = {
  test: {
    receiver: 'http://接收端ip地址/fisreceiver.php',
    toPath: '/home/homework/webroot/static/你的项目名称'
  }
}
let reg = /^test?(\d+)$/g;
if(reg.test(testAddress)) {
   targetAddress = testAddress ? `https://${testAddress}.suanshubang.com` : `本地mock服务地址`;
} else {
  targetAddress = testAddress ? `https://${testAddress}-docker.suanshubang.com` : `本地mock服务地址`;
}
module.exports = {
  outputDir: process.env.outputDir,
  publicPath:  process.env.publicPath,
  productionSourceMap: false,
  parallel: isProduction ? true : false,
  lintOnSave: true,
  chainWebpack: config => {
  },
  pages: {
    index: {
      entry: './src/main.ts'
    }
  },
  devServer: {
    proxy: {
      '/kpstaff': {
        target: !isProduction ? targetAddress : '',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      if(testAddress.indexOf('test') != -1) {
        config.plugins.push(new buildUpload(testServer[testAddress]));
      }
    }
  }
}