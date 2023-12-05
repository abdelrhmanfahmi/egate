const { defineConfig } = require("@vue/cli-service");

const plugins = [];

if (process.env.NODE_ENV === "production") {
  const { join } = require("path");
  const PrerenderPlugin = require("prerender-spa-plugin");
  const renderer = PrerenderPlugin.PuppeteerRenderer;

  plugins.unshift(
    new PrerenderPlugin({
      staticDir: join(__dirname, "dist"),
      routes: [
        "/",
        "/about",
        "/categories",
        "/productPage/:id",
        "/cart",
        "/auth/register",
        "/auth/login",
        "/faq",
        "/privacyPolicy",
        "/checkout",
        "/checkoutConfirmation",
        "/profile",
      ],
      renderer: new renderer({
        injectProperty: "isPrerendering",
        inject: true,

        renderAfterDocumentEvent: "render-complete",
      }),
    })
  );
}

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  publicPath: "/e-gate/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
    configureWebpack(config) {
      config.plugins = [...config.plugins, ...plugins];
    },
  },
});
