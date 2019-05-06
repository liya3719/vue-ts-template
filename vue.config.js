/**
 * vue.config基本配置
 */
const buildUpload = require('./src/common/buildUpload');
const isProduction = process.env.NODE_ENV === 'production';
let testAddress;
try {
  testAddress = JSON.parse(process.env.npm_config_argv).original.slice(2).toString();    
} catch (error) {
  testAddress = process.argv.slice(2).toString();
}
const testServer = {
  test106: {
    receiver: 'http://192.168.240.147:8020/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  },
  qatest23: {
    receiver: 'http://192.168.240.196:8020/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  },
  test100: {
    receiver: 'http://192.168.240.125:8020/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  },
  test77: {
    receiver: 'http://192.168.240.25:8020/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  },
  test211: {
    receiver: 'http://lichen02-docker.suanshubang.com/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  },
  test256: {
    receiver: 'http://192.168.241.74:8020/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  },
  test222: {
    receiver: 'http://wangshukun-docker.suanshubang.com/fisreceiver.php',
    toPath: '/home/homework/webroot/static/lark'
  }
}
module.exports = {
  publicPath:  isProduction ? '/' : '',
  productionSourceMap: false,
  parallel: isProduction ? true : false,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/misservice': {
        target: !isProduction ? `${process.env.VUE_APP_HOST}` : '',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'development') {
      if(testAddress.indexOf('test') != -1) {
        config.plugins.push(new buildUpload(testServer[testAddress]));
      }
    }
  }
}