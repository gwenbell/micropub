var pull = require('pull-stream'),
    ssbClient = require('ssb-client'),
    chalk = require('chalk'),
    moment = require('moment'),
    avatar = require('ssb-avatar');

ssbClient(function(err, sbot) {
    if (err) throw err;
    pull(
        sbot.messagesByType({ type: process.argv[2] || 'micro', live: true }),
        pull.drain(function(msg) {
            var id = msg.value.author;
            var time = msg.value.timestamp;
            var cont = msg.value.content.text;
            console.log(
                chalk.cyan(id) +
                " " +
                cont +
                " " +
                chalk.dim(moment(time).fromNow())
            )
        })
    )
});
