
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/humhum-user/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/_variables.scss";
        `
      }
    }
  }
  }