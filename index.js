var pull = require('pull-stream')
  , ssbclient = require('ssb-client')
  , chalk = require('chalk');

var sbot_cont = function(cb) {
    ssbclient(function(err, sbot) {
        if (err) throw err;
        cb(sbot);
    });
};

sbot_cont(function(sbot) {
     pull(
          sbot.messagesByType({ type: 'micro', live: true }),
          pull.drain(function (msg) { console.log (
                  chalk.cyan(msg.value.author) + " | " + msg.value.content.text
                  ) 
          })
     )
});

