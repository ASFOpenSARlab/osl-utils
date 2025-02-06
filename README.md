# osl-utils
Repo of shared resources (gh actions, dockerfiles, etc) for automating OSL deployments

Using [HyP3's actions](https://github.com/ASFHyP3/actions) as an example to work from.

## Reusable Workflows

A collection of [reusable workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows) that are shared accros this orginization.

### [`reusable-setup-env.yaml`](.github/workflows/reusable-setup-env.yaml)

Sets up variables/tags for each repo. Use like:

```yaml
name: Setup Environment

on:
  push:
    branches:
      - main

jobs:
  call-setup-env-workflow:
    # Docs at: https://github.com/ASFOpenSARlab/osl-utils?tab=readme-ov-file#reusable-setup-envyaml
    uses: ASFOpenSARlab/osl-utils/.github/workflows/reusable-setup-env.yaml@v0.0.2
    with:
      tagname: ${{ github.ref_name }} # Optional; default shown
      aws-region: us-west-2           # Optional; default shown
```

This is used to figure out what environment to use, figure out when you're running on a tag, etc.

## Other Workflows

### [`docker-build.yaml`](.github/workflows/docker-build.yaml)

This is to build a docker container, that has all our CloudFormation/etc tools, that we can use inside other actions or locally to have a similar environment. It is made to be used in other repos like so:

```yaml
jobs:
  # This job makes sure the container uri is all lowercase:
  docker-tag:
    # Docs at: https://github.com/ASFOpenSARlab/osl-utils?tab=readme-ov-file#docker-buildyaml
    env:
      IMAGE_REPO: ghcr.io/ASFOpenSARlab/osl-utils
      IMAGE_REPO_TAG: v0.0.2
    runs-on: ubuntu-latest
    outputs:
      container-uri: ${{ steps.container.outputs.uri }}
    steps:
      - name: Save Container Info
        id: container
        run: echo "uri=${{ env.IMAGE_REPO }}:${{ env.IMAGE_REPO_TAG }}" | tr '[:upper:]' '[:lower:]' >> $GITHUB_OUTPUT

  # Run the actions steps inside of the container:
  your-job-here:
    runs-on: ubuntu-latest
    container:
      image: ${{ needs.docker-tag.outputs.container-uri }}
      credentials:
        username: ASFOpenSARlab-bot
        password: ${{ secrets.PAT_PACKAGES_READ_ONLY }}
    steps:
      - uses: actions/checkout@v4
      - run: echo "Inside the Custom Image!"
      # ...
```

When the image is built, it's tagged with the info from [`reusable-setup-env.yaml`](.github/workflows/reusable-setup-env.yaml). You can use this to test changes here in other actions (Change their tag from `v0.0.2` to `dev` for example), before merging the changes up the maturities here.

## Linting Workflows

### [`reusable-dockerfile-code-quality.yaml`](.github/workflows/reusable-dockerfile-code-quality.yaml)

Uses [`hadolint`](https://github.com/hadolint/hadolint) to lint and format Dockerfiles.

```yaml
name: Lint Dockerfiles
on:
    pull_request: 

jobs:
  shell:
    uses:
        ASFOpenSARlab/osl-utils/.github/workflows/reusable-dockerfile-code-quality.yaml@main
```

### [`reusable-jinja2-code-quality.yaml`](.github/workflows/reusable-jinja2-code-quality.yaml)

Uses [`djlint`](https://www.djlint.com/docs/getting-started/) to lint and format Jinja2
templates. Per-repo configurations are available with a configuration file,
`pyproject.toml`/`djlint.toml`/`.djlintrc` (see the 
[djlint docs](https://www.djlint.com/docs/configuration/)).

```yaml
name: Lint Jinja Templates
on:
    pull_request: 

jobs:
  shell:
    uses:
        ASFOpenSARlab/osl-utils/.github/workflows/reusable-jinja2-code-quality.yaml@main
```

### [`reusable-python-code-quality.yaml`](.github/workflows/reusable-python-code-quality.yaml)

Uses [Ruff](https://docs.astral.sh/ruff/) to lint and format Python source files.

Configure via a `pyproject.toml`, `ruff.toml`, or `.ruff.toml` file (see the
[Ruff docs](https://docs.astral.sh/ruff/configuration/)).

```yaml
name: Lint Python
on:
    pull_request: 

jobs:
  shell:
    uses:
        ASFOpenSARlab/osl-utils/.github/workflows/reusable-python-code-quality.yaml@main
```

### [`reusable-shell-code-quality.yaml`](.github/workflows/reusable-shell-code-quality.yaml)

Uses [`shellcheck`](https://github.com/koalaman/shellcheck) and
[`shfmt`](https://github.com/patrickvane/shfmt) to lint and format (respectively) shell
code.

```yaml
name: Lint Shell
on:
    pull_request: 

jobs:
  shell:
    uses:
        ASFOpenSARlab/osl-utils/.github/workflows/reusable-shell-code-quality.yaml@main
```

### [`reusable-yaml-code-quality.yaml`](.github/workflows/reusable-yaml-code-quality.yaml)

Uses [ `yamllint` ](https://github.com/adrienverge/yamllint) and
[ `yamlfmt` ](https://github.com/google/yamlfmt) to lint and format (respectively) YAML.

```yaml
name: Lint yaml
on:
    pull_request: 

jobs:
  shell:
    uses:
        ASFOpenSARlab/osl-utils/.github/workflows/reusable-yaml-code-quality.yaml@main
```

