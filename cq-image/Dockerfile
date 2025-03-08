FROM ubuntu:24.04

# DL30015
## --no-install-recommends causes curl to fail
## `curl: (77) error setting certificate file: /etc/ssl/certs/ca-certificates.crt`
# DL3009
## Don't delete the apt-get lists since we're installing other packages
# hadolint ignore=DL3015,DL3009
RUN apt-get update -y && \
    apt-get install -y \
    curl="8.5.0-2ubuntu10.6"

RUN apt-get install -y --no-install-recommends \
    tar="1.35+dfsg-3build1" \
    python3="3.12.3-0ubuntu2" \
    python3-pip="24.0+dfsg-1ubuntu1.1" \
    shellcheck="0.9.0-1" \
    shfmt="3.8.0-1" \
    build-essential="12.10ubuntu1" && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ARG hadolint_version="v2.12.0"
RUN curl -L https://github.com/hadolint/hadolint/releases/download/$hadolint_version/hadolint-Linux-x86_64 > /bin/hadolint &&\
    chmod +x /bin/hadolint

ARG yamlfmt_version="v0.16.0"
RUN curl -L https://github.com/google/yamlfmt/releases/download/$yamlfmt_version/yamlfmt_0.16.0_Linux_x86_64.tar.gz > /tmp/yamlfmt.tar.gz &&\
    tar -zx -C /tmp -f /tmp/yamlfmt.tar.gz && \
    mv /tmp/yamlfmt /bin/yamlfmt && \
    chmod +x /bin/yamlfmt

RUN pip install --no-cache-dir --upgrade \
    --break-system-packages \
    djlint=="1.36.4" \
    ruff=="0.9.6" \
    yamllint=="1.35.1"

WORKDIR /app
COPY Makefile /app/Makefile
