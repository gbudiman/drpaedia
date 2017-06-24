var manager = (function() {
  var enabled = true;

  var log = function(x) {
    if (enabled) console.log(x);
  }

  return {
    log: log
  }
})()