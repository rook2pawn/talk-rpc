var http = require('http');
var shoe = require('shoe')
var dnode = require('dnode')
var ecstatic = require('ecstatic')({root:__dirname})
var server = http.createServer(ecstatic)
var sock = shoe(function (stream) {
  var d = dnode({
    foo:function() {
      console.log("FOO!")
    },
    bar:function(val,cb) {
      cb(val.toUpperCase(), function(opinion) {
          console.log("Recieved opinion for capitalizing "+ val + " :" + opinion)
      }, function(fn,cb) {
        fn(5,cb)
      })
    }
  })
  d.pipe(stream).pipe(d);
  d.on('remote',function(_r) {
    console.log("Server got client remote!", _r)
    _r.alertme("Hi this is the server saying hello")
  })
})
sock.install(server, '/stream');
server.listen(5300)
