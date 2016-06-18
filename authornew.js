var pull = require('pull-stream'),
    ssbClient = require('ssb-client'),
    chalk = require('chalk'),
    moment = require('moment')

ssbClient(function(err, sbot) {
    if (err) throw err;
 
    function author(id) {
        pull(sbot.links({
                source: id,
                dest: id,
                rel: 'about',
                values: true
            }),
            pull.drain(function authorname(msg) {
                if (msg.value.content.name != undefined) {
                    var username = msg.value.content.name;
                    console.log(username);
                    return username;
                }
            return authorname;
            })
        )
    }


    pull(
        sbot.messagesByType({
            type: 'micro',
            live: true
        }),
        pull.drain(function(msg) {

            var id = msg.value.author;
            var time = msg.value.timestamp;
            var cont = msg.value.content.text;
            var getName = author(id)
            console.log(
                cont +
                " " +
                chalk.cyan(getName) +
                " " +
                chalk.dim(moment(time).fromNow())
            )
        })
    )
});
