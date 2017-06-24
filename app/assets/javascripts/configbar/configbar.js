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

    $('#modal-remote-config').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    })


    $('#configure-remote').on('click', function() {
      remote.check_signed_in();
      remote.build_shared_profiles();
      $('#modal-remote-config').modal('show');
    })

    $('#remote-friendly-name').editable({
      placement: 'bottom',
      container: '#modal-remote-config',
      viewport: '#modal-remote-config',
      validate: function(value) {
        if (value.trim() == '') {
          return 'Cannot be empty'
        }
      },
      url: '/survivor/name/edit',
      pk: -1,
      name: 'whatever',
      ajaxOptions: {
        type: 'post'
      }
    })

    $('#modal-sync-conflict').modal({
      show: false
    })

    $('#sync-upstream').on('click', function() {
      remote._simulate_upload();
      $('#modal-sync-conflict').modal('close');
    })

    $('#sync-downstream').on('click', function() {
      remote._simulate_download();
      $('#modal-sync-conflict').modal('close');
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