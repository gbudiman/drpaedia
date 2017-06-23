var configbar = (function() {
  var state = 'closed';

  var attach = function() {
    $('#config-button').on('click', function(event) {
      toggle();
      initialize_arrow();
      event.preventDefault();
    });

    $('#what-link').on('click', function() {
      $('#modal-fblink').modal('show');
      return false;
    })

    $('#modal-fblink').modal({
      show: false
    })

    $('#link-to-fb').on('click', function() {
      remote._simulate_login();
      // var $this = $(this);
      // $this.text('Synchronizing...');
      // $this.prop('disabled', true);
      // FB.login(function(response) {
      //   if (response.status == 'connected') {
      //     remote.show_login_button(false);
      //     remote.show_connection_status(true);
      //     remote.do_handshake('facebook', response.authResponse);
      //   } else {
      //     remote.show_login_error_button();
      //     remote.show_connection_status(false);
      //   }
      // }, {scope: 'email'});
    })

    $('#disconnect-fb').on('click', function(event) {
      remote._simulate_logout()
      // FB.logout(function(response) {
      //   remote.show_login_button(true);
      //   remote.show_connection_status(false);
      // })
      event.preventDefault();
    })
  }

  var toggle = function() {
    if (state == 'closed') { open(); } 
    else { close(); }
  }

  var open = function() {
    dragdrop.deselect_all();
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