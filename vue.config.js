
module.exports = {
    publicPath: '/humhum-user/',
    css: {
      loaderOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/_variables.scss";
          `
        }
      }
    }
  }