const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ["vuetify"], 
  publicPath: '/e-gate/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/_variables.scss";
        `
      }
    }
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  

})
