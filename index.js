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
                pull.drain(function(msg) {
                        var cont = msg.value.content;
                        if (cont.type === 'micro') {
                            console.log(
                                    chalk.bold.blue(msg.value.author + ':')
                            );
                            try{
                                console.log(cont.text);
                            } catch(e) {
                                console.log(e);
                            }
                        }
                })
            );
        });
};

list_messages();
