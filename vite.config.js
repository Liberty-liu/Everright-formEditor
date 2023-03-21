import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
const isProduction = process.env.NODE_ENV === 'production'
const examplePlugin = () => {
  let config

  return {
    name: 'custom-vuedraggableAndSortable',
    transform (code, id) {
      /*eslint-disable*/
      if (isProduction) {
        if (/vuedraggable\.js/.test(id)) {
          return code.replace('this._sortable = new Sortable(targetDomElement, sortableOptions);', (...e) => {
            return `Sortable.mount($attrs.plugins || []);
            ${e[0]}`
          })
        }
        if (/sortablejs/.test(id)) {
          return code.replace(`    plugins.forEach(function (p) {
      if (p.pluginName === plugin.pluginName) {
        throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
      }
    });
    plugins.push(plugin);`, (...e) => {
            return `if (!plugins.filter(e => e.pluginName === plugin.pluginName).length) {
          window.plugins = plugins;
			    plugins.push(plugin);}`
          })
        }
      } else {
        if (/vuedraggable/.test(id)) {
          let result = code.replace('this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(targetDomElement, sortableOptions);', (...e) => {
            return `external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a.mount($attrs.plugins || []);
  ${e[0]}`
          })
          result = result.replace(`plugins.forEach(function(p) {
          if (p.pluginName === plugin.pluginName) {
            throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
          }
        });
        plugins.push(plugin);`, (...e) => {
            return `if (!plugins.filter(e => e.pluginName === plugin.pluginName).length) {
          window.plugins = plugins;
			    plugins.push(plugin);}`
          })
          return result
        }
      }
      /*eslint-disable*/
    }
  }
}
export default defineConfig({
  base: './',
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'packages/formEditor/index.js'),
      name: 'Everright-formEditor',
      formats: ['es', 'umd'],
      fileName: 'Everright-formEditor'
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'vant'],
      // https://rollupjs.org/guide/en/#big-list-of-options
      output: {
        globals: {
          vue: 'Vue',
          vant: 'Vant',
          'element-plus': 'elementPlus'
        }
      }
    }
  },
  resolve: {
    alias: [
      {
        find: 'vuedraggable',
        replacement: isProduction ? 'vuedraggable/src/vuedraggable' : 'vuedraggable'
      },
      // {
      //   find: 'editor',
      //   replacement: resolve(__dirname, 'packages/formEditor')
      // },
      {
        find: '@ER',
        replacement: resolve(__dirname, 'packages')
      }
      // {
      //   find: '@ER-FILTER',
      //   replacement: resolve(__dirname, 'packages', 'filter')
      // },
      // {
      //   find: '@ER-REGION',
      //   replacement: resolve(__dirname, 'packages', 'region')
      // },
      // {
      //   find: '@ER-ICON',
      //   replacement: resolve(__dirname, 'packages', 'icon')
      // }
    ]
  },
  plugins: [
    // backend,
    examplePlugin(),
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ],
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: `
      //   @use 'sass:math';
      //   @use 'sass:map';
      //   @use '/packages/theme/base.scss' as *;
      //   @use '/packages/theme/icon';
      //   `
      // }
      scss: {
        additionalData: `
        @use 'sass:math';
        @use 'sass:map';
        @use '@ER/theme/base.scss' as *;
        `
      }
    }
  }
})
