var path = require('path')
var ecstatic = require('ecstatic')({root:path.join(__dirname,'/web')})
var app = require('http').createServer(ecstatic)
app.listen(5150,function() {
  console.log("slide presentation now listening at http://localhost:5150")
})
