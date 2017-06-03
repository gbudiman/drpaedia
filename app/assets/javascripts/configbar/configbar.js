var configbar = (function() {
  var state = 'closed';

  var attach = function() {
    $('#config-button').on('click', function(event) {
      toggle();
      initialize_arrow();
      event.preventDefault();
    });
  }

  var toggle = function() {
    if (state == 'closed') { open(); } 
    else { close(); }
  }

  var open = function() {
    $('#config-bar').css('width', '50%');
    state = 'opened';
  }

  var close = function() {
    $('#config-bar').css('width', '0px');
    state = 'closed';
  }

  var initialize_arrow = function() {
    var target = $('#config-button').find('.profile-arrow');
    if (state == 'opened') {
      target.text(' >> ');
    } else {
      target.text(' << ');
    }
  }

  return {
    attach: attach,
    initialize_arrow: initialize_arrow
  }
})()

$(function() {
  configbar.attach();
})