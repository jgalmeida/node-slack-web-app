var cfg         = require('../../config');
var SlackCore   = require('node-slack-app-core')(cfg);

module.exports = List;

function List(cb) {
  SlackCore.channels.list({}, function(err, result) {
    cb(err, result);
  })
}