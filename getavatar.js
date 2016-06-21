var pull = require('pull-stream'),
    paramap = require('pull-paramap'),
    ssbClient = require('ssb-client'),
    chalk = require('chalk'),
    moment = require('moment'),
    avatar = require('ssb-avatar');
       
var listMessages = function() {
    ssbClient(function(err, sbot) {
        if (err) throw err;
        sbot.whoami( function (err, me) {
            pull(sbot.messagesByType({
                type: process.argv[2] || 'micro',
                live: true
            }), 
            paramap(function (sbot, msg, cb) {
                avatar(sbot, me.id, msg.value.author, function (err, avatar) {
                    msg.avatar = avatar;
                    cb(null, msg);
                });
            }),
            pull.drain(function(msg) {
                var userid = msg.value.author;
                var time = msg.value.timestamp;
                var cont = msg.value.content.text;
                console.log(
                    chalk.cyan(avatar(msg.value.author)) + 
                    " " + 
                    cont +
                    " " + 
                    chalk.dim(moment(time).fromNow())
                );
            }));
        });
   });
};

listMessages()

