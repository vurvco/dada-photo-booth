# dada-photo-booth

Containerized version of the Dada Photo Booth

Able to deploy to a hosted environment

Accepts images from Twitter or file upload, send processed gifs back to Twitter and Firebase

Includes front-end to display the glitched images

Includes camera app for sending photos to be glitched

## Development

### Docker
- To build the image: `docker build -t dpb .`
- To run the image in the background: `docker run -p 49160:8888 -d dpb`
- To get logs: `docker logs <CONTAINER_ID>`
