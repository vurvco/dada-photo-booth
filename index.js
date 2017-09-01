'use strict';

const Hapi = require('hapi');
const Good = require('good');

const gifOut = require('./lib/gifOut');
const postImg = require('./lib/postImg');

// Logging options
const goodOpts = {
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
};

// Create a server with a host and port
const server = new Hapi.Server();
module.exports.server = server;

server.connection({
  host: '0.0.0.0',    // seems necessary, rather than localhost, for Docker
  port: 8888,         // must match exposed port in Dockerfile
  routes: {
    cors: true
  }
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    return reply('hola mundo');
  }
});

server.route({
  method: 'POST',
  path: '/fromIfttt',
  handler: gifOut
});

server.route({
  method: 'POST',
  path: '/fromUs',
  handler: gifOut
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  server.register(goodOpts, (goodErr) => {
    // something bad happened loading the plugin
    if (goodErr) {
      throw goodErr;
    }

    server.start((err) => {
      if (err) {
        throw err;
      }
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  });
}
