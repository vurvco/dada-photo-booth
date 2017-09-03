FROM node:8.4

### SOFTWARE SETUP
RUN apt-get update

# Get and install Processing
RUN wget -O /opt/processing.tgz http://download.processing.org/processing-3.3.5-linux64.tgz
WORKDIR /opt
RUN tar xvf processing.tgz
RUN mv processing-3.3.5 processing

# Create symbolic link for Processing
RUN bash -c "ln -s /opt/processing/{processing,processing-java} /usr/local/bin/"

RUN apt-get -y install gifsicle

### SERVER PREP
RUN mkdir -p /usr/src/dpb
# For temp file storage
RUN mkdir -p /usr/src/dpb/artifacts
RUN mkdir -p /usr/src/dpb/output
WORKDIR /usr/src/dpb
COPY . .
RUN yarn --production

EXPOSE 8888
CMD ["yarn", "start"]
