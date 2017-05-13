var configbar = (function() {
  var state = 'closed';

  var attach = function() {
    $('#config-button').on('click', function(event) {
      toggle();
      event.preventDefault();
    });
  }

  var toggle = function() {
    if (state == 'closed') { open(); } 
    else { close(); }
  }

  var open = function() {
    $('#config-bar').css('width', '250px');
    state = 'opened';
  }

  var close = function() {
    $('#config-bar').css('width', '0px');
    state = 'closed';
  }

  return {
    attach: attach
  }
})()

$(function() {
  configbar.attach();
})