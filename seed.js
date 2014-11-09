var cfg       = require('./web/config');
var Async     = require('async');
var SlackCore = require('node-slack-app-core')(cfg);

var pipeline = [
  importUsers,
  importChannels,
  importMessages
]

/*
  TODO - CLEAN UP DB
*/


console.log('*********************************')
console.log('Import started')
console.log('*********************************')

Async.waterfall(pipeline, handleResult);

function handleResult(err, result) {
  if(err) {
    console.log('**********************');
    console.log('ERROR', err);
    console.log('**********************');
  } else {
    console.log('*********************************')
    console.log('Import completed')
    console.log('*********************************')
    process.exit();
  }
}

function importUsers(next) {
  SlackCore.users.bulkImport(function(err, result) {
    console.log('-------------------------------')
    console.log('Importing Users')
    console.log('-------------------------------')

    if(err){
      return next('Error importing users');
    } else {
      console.log('Users import finished');
    }

    console.log('-------------------------------')
    next(null);
  })
}

function importChannels(next) {
  SlackCore.channels.bulkImport(function(err, result) {
    console.log('-------------------------------')
    console.log('Importing Channels')
    console.log('-------------------------------')

    if(err){
      return next('Error importing channels');
    } else {
      console.log('Channels import finished');
    }

    console.log('-------------------------------');
    next(null);
  })
}

function importMessages(next) {
  SlackCore.channels.list({}, function(err, result) {
    console.log('-------------------------------')
    console.log('Importing Channels Messages')
    console.log('-------------------------------')

    var toImport = result.length;

    result.forEach(function(channel) {
      console.log('Channel #', channel.id)
      SlackCore.channels.importMessages(channel.id, function(err, result) {
        if(err){
          return next('Error importing channel #', channel.id);
        } else {
          console.log('Channel #', channel.id, 'Imported');
          if(--toImport === 0) next(null);
        }
      })
    })

    console.log('-------------------------------')
  })
}