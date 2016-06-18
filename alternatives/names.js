var pull = require('pull-stream')
  , ssbClient = require('ssb-client')
  , chalk = require('chalk')
  , moment = require('moment')

var sbot = function(cb) {
    ssbClient(function(err, sbot) {
        if (err) throw err;
        cb(sbot);
    });
};

sbot(function(sbot) {
    pull(
      sbot.links({
        source: '@8Qee0I/DwI5DHSCi3p5fsl6FyLGArrnDz3ox9qZr5Qc=.ed25519',
        dest: '@8Qee0I/DwI5DHSCi3p5fsl6FyLGArrnDz3ox9qZr5Qc=.ed25519',
        rel: 'about',
        values: true
      }),
      pull.drain(function (msg) { 
               if (msg.value.content.name != undefined) {
                console.log(msg.value.content.name);
               }
    
        })
      )
})


