var pull = require('pull-stream')
  , ssbClient = require('ssb-client')
  , chalk = require('chalk');

var sbot = function(cb) {
    ssbClient(function(err, sbot) {
        if (err) throw err;
        cb(sbot);
    });
};

sbot(function(sbot) {
     pull(
          sbot.messagesByType({ type: 'micro', live: true }),
          pull.drain(function (msg) { console.log (
                  chalk.cyan(msg.value.author) + " | " + msg.value.content.text
                  ) 
          })
     )
});

