var dnode = require('dnode')
var shoe = require('shoe')
var remote;

$(window).ready(function() {
  var d = dnode({alertme:function(msg) { 
    alert("SERVER SAYS:"+ msg); }
  })
  var stream = shoe('/stream');
  d.pipe(stream).pipe(d);
  d.on('remote', function(_r) {
    console.log("Got remote:", _r)
    remote = _r;
    remote.foo()
  })
  $('input#mybutton').click(function() {
    var val = $('input#mytext').val();
    var myfunction = function(sendOpinion) {
      var opinion = window.prompt("Please enter your opinion of this capitalization service:")
      sendOpinion(opinion) 
    }
    var squared = function(x,cb) { console.log("squared being called with x:", x);
      cb(x*x)
    }
    remote.bar(val, function(result, sendOpinion, somefunc ) {
      $('div#results').html(result);
      myfunction(sendOpinion)
      somefunc(squared, function(val) {
        console.log("val:", val)
      })
    })
  })
})
