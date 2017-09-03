'use strict';

const Hapi = require('hapi');
const Good = require('good');

const { gifOut } = require('./lib/gifOut');

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
  path: '/health',
  handler: function (request, reply) {
    return reply('they live\n');
  }
});

server.route({
  method: 'POST',
  path: '/camera_upload',
  config: {
    payload: {
      output: 'data',
      parse: false
    }
  },
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
