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
    uses: ASFOpenSARlab/osl-utils/.github/workflows/reusable-setup-env.yaml@v0.0.1
    with:
      tagname: ${{ github.ref_name }} # Optional; default shown
      aws-region: us-west-2           # Optional; default shown
```

## Other Workflows

### [`docker-build.yaml`](.github/workflows/docker-build.yaml)

This is to build a docker container, that has all our CloudFormation/etc tools, that we can use inside other actions or locally to have a similar environment.
