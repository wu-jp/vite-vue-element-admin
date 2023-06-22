module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended'],
  // extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     singleline: 10,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false,
    //     },
    //   },
    // ],
    'vue/multi-word-component-names': 'off',
  },
};
