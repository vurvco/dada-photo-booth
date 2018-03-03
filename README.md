# dada-photo-booth

### Implementation of Dada Photo Booth, in accordance with Atwood's Law

_How does one achieve eternal bliss? By saying dada. How does one become famous? By saying dada. With a noble gesture and delicate propriety. Till one goes crazy. Till one loses consciousness._

Includes [front-end](./client) to display the glitched images.

Includes [camera app](./camera) for sending photos to be glitched.

Includes [server](./server) for processing and sending off photos.

## Running
_Ensure you have node.js and npm installed, as well as ImageMagick and maybe OpenCV?_

- Run `npm install && npm start` in the `camera` directory. An Electron application will open.
- Run `npm install && npm start` in the `client` directory. Navigate to [localhost:3001](localhost:3001) in your browser, if the script does not take you there directly.
- Run `npm install && npm start` in the `server` directory. The socket will be running at [0.0.0.0:3000](0.0.0.0:3000)&mdash;check on the health by pressing the `h` key in the Electron app and check on the output in the server console.

## Development

- `npm install` in `camera`, `client`, and `server`.
- `npm start` in `server`
- `npm run watch` in `camera` before...
- `npm start` in `camera`
