// https://github.com/theoludwig/markdownlint-rule-relative-links

import relativeLinksRule from "markdownlint-rule-relative-links"

const config = {
  config: {
    default: true,
    "relative-links": "/code",
  },
  globs: ["**/*.md"],
  ignores: [
    "**/node_modules",
  ],
  customRules: [relativeLinksRule],
}

export default config
