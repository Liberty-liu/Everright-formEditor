module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-export-in-script-setup': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-debugger': 'off',
    'vue/no-mutating-props': 'off',
    'import/no-absolute-path': 'off',
    'vue/prefer-import-from-vue': 'off',
    'prefer-promise-reject-errors': 'off',
    'n/no-callback-literal': 'off',
    'promise/param-names': 'off',
    'no-case-declarations': 'off',
    'no-useless-escape': 'off',
    'no-mixed-operators': 'off',
    'no-async-promise-executor': 'off',
    'quotes': 'off'
  },
  overrides: [
    // {
    //   files: ['/Users/liuhaifeng/Documents/own/vue/Everright-editor/src/editor/panels/Config/Config.vue'],   // 匹配views和二级目录中的index.vue
    //   rules: {
    //     'vue/multi-word-component-names':"off",
    //   } //给上面匹配的文件指定规则
    // },
  ]
}
