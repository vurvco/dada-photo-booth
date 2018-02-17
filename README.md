# dada-photo-booth

### Implementation of Dada Photo Booth, in accordance with Atwood's Law

_How does one achieve eternal bliss? By saying dada. How does one become famous? By saying dada. With a noble gesture and delicate propriety. Till one goes crazy. Till one loses consciousness._

Includes [front-end](./client) to display the glitched images.

Includes [camera app](./camera) for sending photos to be glitched.

Includes [server](./server) for processing and sending off photos.

## Running
_Ensure you have node.js and npm installed_

- Run `npm install && npm start` in the `camera` directory. Navigate to [localhost:3000](localhost:3000) in your browser.
- Run `npm install && npm start` in the `client` directory. Navigate to [localhost:3000](localhost:3001) in your browser, if the script does not take you there directly.
- Run `npm install && npm start` in the `server` directory. Server will be running at [0.0.0.0:8888](0.0.0.0:8888)&mdash;check on it at [0.0.0.0:8888/health](0.0.0.0:8888/health).

## Development

- `npm install` in `camera`, `client`, and `server`.
