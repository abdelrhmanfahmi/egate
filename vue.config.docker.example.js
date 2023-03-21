module.exports = {
  publicPath: "<ENV_USER_BASE>",
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
