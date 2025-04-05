import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import html from "@html-eslint/eslint-plugin";
import css from "@eslint/css";


export default defineConfig([
  // Reminder that ordering does matter. tseslint needs to come first so html can disable the type checking.
  tseslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.html", "**/*.htm"],
    extends: [tseslint.configs.disableTypeChecked],
    ...html.configs["flat/recommended"],
    // Turn off styling rules so they don't interfere with Prettier
    rules: {
      "attrs-newline": "off",
      "element-newline": "off",
      "id-naming-convention": "off",
      "indent": "off",
      "lowercase": "off",
      "max-element-depth": "off",
      "no-extra-spacing-attrs": "off",
      "no-multiple-empty-lines": "off",
      "no-trailing-spaces": "off",
      "quotes": "off",
      "sort-attrs": "off",
    }
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    languageOptions: { tolerant: false },
    rules: { "css/no-empty-blocks": "error" },
  },
  globalIgnores([
    "**/build/**",
    "**/node_modules/**",
    "**/labextension/**"
  ])
]);

