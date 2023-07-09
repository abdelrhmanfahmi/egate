const { defineConfig } = require("@vue/cli-service");
// var PrerenderSpaPlugin = require("prerender-spa-plugin");
// var path = require("path");
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
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
        "/about",
        "/categories",
        "/productPage/:id",
        "/cart",
        "/auth/register",
        "/auth/login",
        "faq",
        "privacyPolicy",
        "/categories",
        "/checkout",
        "/checkoutConfirmation",
        "/profile",
      ],
      useRenderEvent: true,
      onlyProduction: true,

      headless: false, // <- this could also be inside the customRendererConfig
      customRendererConfig: {
        args: ["--auto-open-devtools-for-tabs"],
      },
      postProcess: (route) => {
        // Defer scripts and tell Vue it's been server rendered to trigger hydration
        route.html = route.html
          .replace(/<script (.*?)>/g, "<script $1 defer>")
          .replace('id="app"', 'id="app" data-server-rendered="true"');
        return route;
      },
    },
  },
});
