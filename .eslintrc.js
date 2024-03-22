module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'], // 启用 Prettier 的推荐规则，与 Prettier 一起使用时，这些规则可以确保代码格式与 Prettier 保持一致
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error' // 如果代码不符合 Prettier 的格式要求，则报错
  }
}
