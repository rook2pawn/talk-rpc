var dnode = require('dnode')
var shoe = require('shoe')
var remote;

$(window).ready(function() {
  var d = dnode()
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
    remote.bar(val, function(result, sendOpinion) {
      $('div#results').html(result);
      myfunction(sendOpinion)
    })
  })
})
