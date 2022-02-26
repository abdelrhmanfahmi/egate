
module.exports = {
    publicPath: '/humhum-user/',
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