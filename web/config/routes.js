var usersController = require('../controllers/users');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('/users');
  })
  app.get('/users', usersController.index)
  app.get('/users/:id', usersController.show)
  app.get('/users/:userId/channels/:id/messages', usersController.messages)
}