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

## Other Workflows

### [`docker-build.yaml`](.github/workflows/docker-build.yaml)

This is to build a docker container, that has all our CloudFormation/etc tools, that we can use inside other actions or locally to have a similar environment. It is made to be used in other repos like so:

```yaml
jobs:
  # Make sure the container uri is all lowercase:
  docker-tag:
    env:
      TOOLS_REPO: ghcr.io/asfopensarlab/osl-utils
      TOOLS_REPO_TAG: v0.0.2
    runs-on: ubuntu-latest
    outputs:
      container-uri: ${{ steps.container.outputs.uri }}
    steps:
      - name: Save Container Info
        id: container
        run: echo "uri=${{ env.TOOLS_REPO }}:${{ env.TOOLS_REPO_TAG }}" | tr '[:upper:]' '[:lower:]' >> $GITHUB_OUTPUT

  # Run the actions steps inside of the container:
  your-job-here:
    runs-on: ubuntu-latest
    container:
      image: ${{ needs.docker-tag.outputs.container-uri }}
      credentials:
        username: BOT_ACCOUNT_USERNAME
        password: ${{ secrets.PAT_PACKAGES_READ_ONLY }}
    steps:
      - uses: actions/checkout@v4
      - run: echo "Inside the Custom Image!"
      # ...
```
