var UserService    = require('../services/user');
var ChannelService = require('../services/channel');

module.exports = {
  index:    index,
  show:     show,
  messages: messages
}

function index(req, res) {
  UserService.list(function(err, result) {
    res.render('users/index', {
      title: 'Index',
      users: result
    })
  })
}

function show(req, res) {
  ChannelService.list(function(err, result) {
    res.render('users/show', {
      title: 'Show',
      userId: req.params.id,
      channels: result
    })
  })
}

function messages(req, res) {
  var params = {
    userId:    req.params.userId,
    channelId: req.params.id,
    gte:       req.query.gte,
    lte:       req.query.lte
  }

  UserService.messages(params, function(err, result) {
    res.render('users/messages', {
      title: 'Messages',
      messages: result
    })
  })
}