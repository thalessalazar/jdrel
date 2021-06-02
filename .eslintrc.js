module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "inebreak-style": 0,
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    "arrow-body-style": ["error", "never"]
  },
};
