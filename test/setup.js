var config   = require('./config');
var mongoose = require('mongoose');

function setup(cb) {
  process.env.SLACK_TOKEN = 'FAKETOKEN'
  cleanUp();
  cb();
}

function cleanUp(){
  var collections      = mongoose.connection.collections;
  var collectionsNames = Object.keys(collections);

  var todo = collectionsNames.length;

  if (!todo) return;

  collectionsNames.forEach(function(name) {
    var collection = collections[name];

    if (name.match(/^system\./)) return --todo;

    collection.remove({ },{ safe: true }, function() {
      if (--todo === 0) return;
    });
  });
}

module.exports = setup;