module.exports = {
  pwa: {
    name: "LogB Cloud",
    themeColor: "#4895CB",
    msTileColor: "#4895CB",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    appleMobileWebAppCapable: "yes",
    workboxOptions: {
      clientsClaim: 'true',
      skipWaiting: 'true',
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },

  lintOnSave: false,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: "assets",
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: true,
  css: {
    extract: false
  }
};
