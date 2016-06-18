var pull = require('pull-stream'),
    ssbClient = require('ssb-client'),
    chalk = require('chalk'),
    moment = require('moment'),
    avatar = require('ssb-avatar');

var sbot = function(cb) {
    ssbClient(function(err, sbot) {
        if (err) throw err;
        cb(sbot);
    });
};

ssbClient(function(err, sbot) {
    if (err) throw err;
    pull(
        sbot.messagesByType({ type: 'micro', live: true }),
        pull.drain(function(msg) {
            var id = msg.value.author;
            var time = msg.value.timestamp;
            var cont = msg.value.content.text;
            console.log(
                cont +
                " " +
                chalk.cyan(id) +
                " " +
                chalk.dim(moment(time).fromNow())
            )
        })
    )
});
