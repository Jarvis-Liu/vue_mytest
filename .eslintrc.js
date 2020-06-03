module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
  },
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "no-unused-vars": "off",
    'no-console': 'off',
  },
};
