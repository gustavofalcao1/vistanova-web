module.exports = {
  root: true,
  extends: [
    // your existing extends
  ],
  rules: {
    // your existing rules
  },
  overrides: [
    {
      files: ["tailwind.config.js", "tailwind.config.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-commonjs": "off"
      }
    },
    {
      files: ["*.cjs"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-commonjs": "off"
      }
    }
  ]
};
