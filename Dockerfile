FROM fedora:latest

## Install DNF Packages:
RUN dnf upgrade -y && \
    dnf install -y unzip make && \
    dnf clean all

## Install AWS CLI v2:
# https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install
