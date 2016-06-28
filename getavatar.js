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
            paramap(function(msg, cb) {
                avatar(sbot, me.id, msg.value.author, function (err, avatar) {
                    msg.avatar = avatar;
                    cb(null, msg);
               })
            }),
            pull.drain(function(msg) {
                console.log(
                    chalk.cyan(msg.avatar.name) + 
                    " " + 
                    msg.value.content.text +
                    " " + 
                    chalk.dim(moment(msg.value.timestamp).fromNow())
                );
            }));
        });
   });
};

listMessages()

