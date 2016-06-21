// This example doesn't work, returns sbot.links is not a function

var pull = require('pull-stream'),
    ssbClient = require('ssb-client'),
    chalk = require('chalk'),
    moment = require('moment'),
    avatar = require('ssb-avatar');

ssbClient(function(err, sbot) {
    if (err) throw err;
    pull(
        sbot.messagesByType({ type: process.argv[2] || 'micro', live: true }),
        sbot.whoami(function (err, me, userid) {
            avatar(sbot, me.id, userid || me.id, function (err, data) {
                   console.log(JSON.stringify(data, null, 2))
                   return data;
                   sbot.close()
            })
        }),
        pull.drain(function(msg) {
            var userid = msg.value.author;
            var time = msg.value.timestamp;
            var cont = msg.value.content.text;
            console.log(avatar(userid))
            console.log(
                chalk.cyan(userid) +
                " " +
                cont +
                " " +
                chalk.dim(moment(time).fromNow())
            )
        })
    )
});
