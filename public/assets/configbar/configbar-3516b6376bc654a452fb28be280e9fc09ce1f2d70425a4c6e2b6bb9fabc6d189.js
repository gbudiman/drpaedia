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

      $(this).prop('disabled', true);
      $('#link-to-fb-text').text('Connecting...');
    })

    $('#disconnect-fb').on('click', function(event) {
      remote._simulate_logout()
      // FB.logout(function(response) {
      //   remote.show_login_button(true);
      //   remote.show_connection_status(false);
      // })
      $(this).prop('disabled', true).text('Disconnecting...');
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
      $('#modal-remote-config').modal('show');
      remote.check_signed_in();
      remote.build_shared_profiles();
    })

    if ($('#remote-friendly-name').length > 0) {
      $('#remote-friendly-name').editable({
        placement: 'bottom',
        container: '#modal-remote-config',
        viewport: '#modal-remote-config',
        mode: 'inline',
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
      }).on('save', function(e, params) {
        remote_interface.update_example_name(params.newValue);
      })
    }

    $('#modal-sync-conflict').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('show.bs.modal', function() {
      var height = $(window).height() - 96;
      $('#modal-sync-conflict-body').css('max-height', height + 'px');
    })

    $('#sync-upstream').on('click', function() {
      //remote._simulate_upload();
      remote.force_upload();
      $('#modal-sync-conflict').modal('hide');
      notifier.notify_synced('Server data has been synchronized');
    })

    $('#sync-downstream').on('click', function() {
      remote._simulate_download();
      $('#modal-sync-conflict').modal('hide');
      notifier.notify_synced('Your local data has been synchronized');
    })

    $('#profiles-dropdown').on('click', function() {
      if (remote.is_connected()) {
        fetch_guest_profiles();
      } else {
        profile_interface.remove_guest_profiles();
      }
    })
  }

  var fetch_guest_profiles = function() {
    profile_interface.preappend_guest_profiles();
    $.ajax({
      method: 'GET',
      url: '/profile/list_guests'
    }).done(function(response) {
      profile_interface.append_guest_profiles(response);
    })
  }

  var toggle = function() {
    if (state == 'closed') { open(); } 
    else { close(); }
  }

  var open = function() {
    dragdrop.deselect_all();
    $('#config-bar').show().css('width', '50%');
    state = 'opened';
  }

  var close = function() {
    $('#config-bar').css('width', '0px');
    state = 'closed';
  }

  var initialize_arrow = function() {
    var target = $('#config-button').find('.profile-arrow');
    if (state == 'opened') {
      target.html('&raquo; ');
    } else {
      target.html('&laquo; ');
    }
  }

  return {
    attach: attach,
    fetch_guest_profiles: fetch_guest_profiles,
    initialize_arrow: initialize_arrow
  }
})()

$(function() {
  configbar.attach();
});
