FROM fedora:latest

## Install DNF Packages:
RUN dnf upgrade -y && \
    dnf install -y unzip make nodejs git make jq python3-pip && \
    dnf clean all

## Install AWS CLI v2:
# https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install

## Install AWS CDK:
# Install node/aws-cdk
RUN npm install -g npm && \
    npm install -g aws-cdk

COPY ./requirements.txt /requirements.txt

# Install wheel first so it can be used with the rest of the packages
RUN python3 -m pip install --no-cache-dir --upgrade wheel && \
    python3 -m pip install --no-cache-dir -r /requirements.txt
