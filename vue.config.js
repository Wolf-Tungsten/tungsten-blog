// vue.config.js
module.exports = {
    publicPath:process.env.NODE_ENV === 'production'
    ? 'https://cdn.wolf-tungsten.com/'
    : '/'
  }