var express = require('express')
var app = express()
var HTTP = require('http')
var HTTPS = require('https')
var fs = require('fs')

app.get('/', function(req, res){
    res.send("Welcome to the internet!")
})

try {
    var httpsConfig = {
        key: fs.readFileSync('/etc/letsencrypt/live/thepasswordisdragons.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/thepasswordisdragons.com/cert.pem'),
    }

    var httpsServer = HTTPS.createServer(httpsConfig, app)
    // 443 is the default port for HTTPS traffic
    httpsServer.listen(443)
}
catch(e){
    console.log(e)
    console.log('could not start HTTPS server')
}


var httpServer = HTTP.createServer(app)

httpServer.listen(80)

