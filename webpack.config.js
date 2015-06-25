var getConfig = require('hjs-webpack')

var config = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  port: process.env.PORT
})

//Enable stage 0 for Babel
config.module.loaders.forEach(function (filter) {
  if (filter.loaders) {
    filter.loaders.forEach(function(loader, idx, arr) {
      if (loader === 'babel-loader') {
        arr[idx] = 'babel-loader?stage=0'
      }
    })
  }
})

module.exports = config
