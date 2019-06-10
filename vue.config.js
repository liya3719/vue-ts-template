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
};
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
  }
}