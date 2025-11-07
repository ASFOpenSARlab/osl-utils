// https://github.com/theoludwig/markdownlint-rule-relative-links

import relativeLinksRule from "markdownlint-rule-relative-links"

const config = {
  config: {
    default: true,
    "relative-links": {
      // The root of the project for resolving paths,
      // NOT the path to start looking for md's from.
      root_path: "/code",
    },
  },
  // HERE is where you specify the path to files to lint:
  globs: ["/code/**/*.md"],
  ignores: [
    "**/node_modules",
    "**/.venv",
  ],
  customRules: [relativeLinksRule],
}

export default config
