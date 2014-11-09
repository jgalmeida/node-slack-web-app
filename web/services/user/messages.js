var cfg         = require('../../config');
var SlackCore   = require('node-slack-app-core')(cfg);

module.exports = Messages;

function Messages(params, cb) {
  SlackCore.messages.list(messageQuery(), function(err, result) {
    cb(err, result);
  })

  function messageQuery() {
    params.gte = params.gte || "1970/01/01";
    params.lte = params.lte || new Date();

    var gte = new Date(params.gte);
    var lte = new Date(params.lte);

    gte.setHours(0,0,0,999);
    lte.setHours(23,59,59,999);

    var query = {
      user:    params.userId,
      channel: params.channelId,
      date: {
        $gte: gte,
        $lte: lte
      }
    }

    return query;
  }
}