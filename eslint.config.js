import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/", "reports/", "dist/", "coverage/"],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);
