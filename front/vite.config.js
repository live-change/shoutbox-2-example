const path = require('path')
const vuePlugin = require('@vitejs/plugin-vue')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    vuePlugin({
      template: {
        compilerOptions: {
          whitespace: "preserve",
        },
      },
    })
  ],
  build: {
    minify: false,
  
    // rollupOptions: {
    //   plugins: [        
    //     builtinsPlugin
    //   ]
    // },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  ssr: {
    external: [
      '@live-change/dao',
      '@live-change/vue-api',
      '@live-change/vue-api-session',
      'debug',
      '@vue/server-renderer',
      'vite'
    ],
    noExternal: [
      'vue-meta'
    ]
  },
  optimizeDeps: {
    include: [
      '@live-change/vue-api',
      '@live-change/vue-api-session',
      '@live-change/dao',
      '@live-change/dao-sockjs',
      '@live-change/dao-websocket',
    ]
  },

  resolve: {
    alias: [
      { find: 'sockjs-client', replacement: 'sockjs-client/dist/sockjs.min.js' }
      //{ find: '@live-change/framework-vue', replacement: path.resolve('../../framework-vue') },
      //{ find: '@live-change/framework-vue-api', replacement: path.resolve('../../framework-vue-api') },
    ],
  },
  resolvers: [{
    fileToRequest (filePath) {
      console.log('@@@', filePath);
      if (filePath.startsWith(srcPath)) {
        return `/@/${path.relative(srcPath, filePath)}`;
      }
    },
    requestToFile (publicPath) {
      if (publicPath.startsWith('/@/')) {
        return path.join(srcPath, publicPath.replace(/^\/@\//, ''));
      }
    },
  }],
}