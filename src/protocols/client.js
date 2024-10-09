const trace = require('debug')('soundcloud-rp:trace');
const debug = require('debug')('soundcloud-rp:client-protocol');

module.exports = function(config, io, rpc) {

  const activity = require('../procedures/activity')(config, rpc);

  io.on('connection', function(socket){
    trace('client.connection', socket.id);
    socket.on('activity', function(data){
      activity(data)
      .then(() => {
        socket.emit('activity', true, {});
      })
      .catch((err) => {
        socket.emit('activity', false, {
          error: err.name,
          message: err.message
        });
      })
    });

    socket.on('disconnect', (reason) => {
      trace(`Client disconnected due to: ${reason}`);
    });
  });
};