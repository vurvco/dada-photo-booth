FROM node:8.4

### SETUP
RUN apt-get update

# Get and install Processing
RUN wget -O /opt/processing.tgz http://download.processing.org/processing-3.3.5-linux64.tgz
WORKDIR /opt
RUN tar xvf processing.tgz
RUN mv processing-3.3.5 processing

# Create symbolic link for Processing
RUN bash -c "ln -s /opt/processing/{processing,processing-java} /usr/local/bin/"

RUN apt-get -y install gifsicle

### SYSTEM PREP

RUN mkdir -p /usr/src/dpb
RUN mkdir -p /usr/src/dpb/glitched # For temp file storage
WORKDIR /usr/src/dpb
COPY . .
# RUN yarn

EXPOSE 8888

# start a server, listening for image uploads for processing and POSTing to Twitter
# RUN yarn start
