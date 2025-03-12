# osl-cq-image

The osl-cq-image container is designed to be used locally by developers
and by the reusable code quality GitHub Actions workflows.

## Local Usage

```
$ docker run -v $(pwd):/code ghcr.io/asfopensarlab/osl-cq-image:v0.0.7 make help
```

will output the following message:

```
make all: lint check
make lint: docker_lint jinja_lint python_lint_check shell_lint yaml_lint
make check: jinja_format_check python_format_check shell_format_check yaml_format_check
make fix: jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix

Dockerfile:         `hadolint`      https://github.com/hadolint/hadolint/wiki
Jinja:              `djlint`        https://www.djlint.com/docs/configuration/
Python:             `ruff`          https://docs.astral.sh/ruff/
Bash Linting:       `shellcheck`    https://www.shellcheck.net/wiki/Home
Bash Formatting:    `shfmt`         https://github.com/patrickvane/shfmt
YAML Linting:       `yamllint`      https://yamllint.readthedocs.io/en/stable/configuration.html
YAML Formatting:    `yamlfmt`       https://github.com/google/yamlfmt/tree/main/docs
```

In this context, `make all` runs all linting and format-checking targets, and
is a read-only operation. `make fix` will attempt to fix any formatting issues,
as well as python linting issues, and will write to the codebase.

Note that the virtual mount in the command above (`$(pwd):/code`) *must*
be to the `/code` directory inside the container, as this is where the
internal Makefile expects the code to be.

## Actions Usage

Images are used in the reusable actions workflows as in the snippet from the
[reusable YAML action](.github/workflows/reusable-yaml-code-quality.yaml) below:

```yaml
on:
  workflow_call:
jobs:
  linting:
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/asfopensarlab/osl-cq-image:v0.0.7
      volumes:
        - ${{ github.workspace }}:/code
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      - name: Lint yaml Files
        run: |
          cd /app
          make yaml_lint
```

These actions are callable in runner workflows as in the
[osl-utils linting action](.github/workflows/lint.yaml):

```
on:
  pull_request: {}
  workflow_dispatch: {}
jobs:
  yaml:
    uses: ASFOpenSARlab/osl-utils/.github/workflows/reusable-yaml-code-quality.yaml@v0.0.7
  dockerfile:
    uses: ASFOpenSARlab/osl-utils/.github/workflows/reusable-dockerfile-code-quality.yaml@v0.0.7
```
