var pull = require('pull-stream')
  , ssbclient = require('ssb-client')
  , chalk = require('chalk');

var sbot_cont = function(cb) {
    ssbclient(function(err, sbot) {
        if (err) throw err;
        cb(sbot);
    });
};

var list_messages = function() {
    sbot_cont(function(sbot) {
        pull(
             sbot.createLogStream(),
             pull.collect(function(err, msgs) {
                 msgs.map(function(item) {
                      var cont = item.value.content;
                      if (cont.type === 'micro') {
                         console.log(
                            chalk.bold.cyan(item.value.author) + " | " + (cont.text)
                         );
                      }
                 });
             })
       );
    });
};

list_messages();
