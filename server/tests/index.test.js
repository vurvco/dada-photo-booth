const test = require('ava');
const { server } = require('../index');

test('server exports port 8888', (t) => {
  t.is(server.info.port, 8888, 'port number has changed');
});
