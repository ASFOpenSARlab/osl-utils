FROM fedora:41

## Install DNF Packages:
# hadolint ignore=DL3041
RUN dnf upgrade -y && \
    dnf install -y \
    unzip \
    make \
    nodejs \
    git \
    make \
    jq \
    curl \
    python3 \
    python3-pip && \
    dnf clean all

## Install HadoLint:
ARG hadolint_version="v2.12.0"
RUN curl -L https://github.com/hadolint/hadolint/releases/download/$hadolint_version/hadolint-Linux-x86_64 > /bin/hadolint &&\
    chmod +x /bin/hadolint

## Install YamlFMT:
ARG yamlfmt_version="v0.16.0"
RUN curl -L https://github.com/google/yamlfmt/releases/download/$yamlfmt_version/yamlfmt_0.16.0_Linux_x86_64.tar.gz > /tmp/yamlfmt.tar.gz &&\
    tar -zx -C /tmp -f /tmp/yamlfmt.tar.gz && \
    mv /tmp/yamlfmt /bin/yamlfmt && \
    chmod +x /bin/yamlfmt

## Install AWS CLI v2:
# https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

## Install AWS CDK:
# Install node/aws-cdk
# hadolint ignore=DL3016
RUN npm install -g npm && \
    npm install -g aws-cdk

COPY ./requirements.txt /requirements.txt

# Install wheel first so it can be used with the rest of the packages
# hadolint ignore=DL3013
RUN python3 -m pip install --no-cache-dir --upgrade wheel && \
    python3 -m pip install --no-cache-dir -r /requirements.txt

WORKDIR /app
COPY linting.Makefile /app/Makefile
