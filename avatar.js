var ssbClient = require('ssb-client')
    getAvatar = require('ssb-avatar')

ssbClient(function (err, sbot) {
  if(err) throw err
  sbot.whoami(function (err, me) {
    getAvatar(sbot, me.id, process.argv[2] || me.id, function (err, data) {
      console.log(JSON.stringify(data, null, 2))
      sbot.close()
    })
  })
})


