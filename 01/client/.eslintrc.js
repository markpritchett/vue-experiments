module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
