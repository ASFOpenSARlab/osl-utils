import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import html from "@html-eslint/eslint-plugin";
import css from "@eslint/css";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ["js/recommended"]
  },
  {
    files: ["**/*.html"],
    ...html.configs["flat/recommended"]
  },
  {
		files: ["**/*.css"],
		plugins: { css },
		language: "css/css",
		languageOptions: { tolerant: false },
		rules: { "css/no-empty-blocks": "error" },
	},
  tseslint.configs.recommended,
  globalIgnores([
    "**/build/**",
    "**/node_modules/**",
    "**/labextension/**"
  ])
]);
