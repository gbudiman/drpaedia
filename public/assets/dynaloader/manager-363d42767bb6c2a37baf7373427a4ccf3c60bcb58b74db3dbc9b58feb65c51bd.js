var manager = (function() {
  var enabled = false;

  var log = function(x) {
    if (enabled) console.log(x);
  }

  return {
    log: log
  }
})();
