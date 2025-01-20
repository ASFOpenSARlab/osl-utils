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
    uses: ASFOpenSARlab/osl-utils/.github/workflows/reusable-bump-version.yml@v0.15.0
    with:
      tagname: ${{ github.ref_name } # Optional; default shown
      aws-region: us-west-2          # Optional; default shown
```
