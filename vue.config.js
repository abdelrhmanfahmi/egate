module.exports = {
  publicPath: "/humhum-user/",
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_variables.scss";
          `,
      },
    },
  },
};
