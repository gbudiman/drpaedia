var remote = function() {
  var is_connected = false;
  var _simulate_login = function() {
    // FB.login(function(response) {
    //   if (response.status == 'connected') {
    //     //window.open('/auth/facebook/callback', 'login_aux', 'scrollbars=0, resizable=0, height=256, width=384');
    //   }
    //   //do_handshake('facebook', response.authResponse);
    // }, {scope: 'email'})
    window.open('/survivors/auth/facebook', 'login_aux', 'scrollbars=0, resizable=0, height=512, width=512');
  }

  var _simulate_upload = function(_fresh_login) {
    var downstream_profile = profile.get_root();
    var fresh_login = _fresh_login == undefined ? false : _fresh_login;

    $.ajax({
      method: 'POST',
      url: '/sync/upstream',
      csrf: get_csrf(),
      data: {
        profile_data: JSON.stringify(downstream_profile.transmit),
        fresh_login: fresh_login
      }
    }).done(function(response) {
      if (response.response == 'synchronized') {
        manager.log('Upstream synchronized');
      } else if (response.response == 'disconnected') {
      } else if (response.response == 'check') {
        manager.log('Check compare');
        var m = profile.compute_metadata(response.comparison);
        remote_interface.update_sync_conflict(downstream_profile.metadata, 
                                              m,
                                              downstream_profile.transmit.config.timestamp,
                                              response.comparison.config.timestamp);
      } else {

        profile.sync(response.response);
        //console.log('Need to syncrhonize downstream');
      }
    })
  }

  var _simulate_download = function() {
    $.ajax({
      method: 'GET',
      url: '/sync/downstream'
    }).done(function(response) {
      profile.sync(response.response);
    })
  }

  var _simulate_logout = function() {
    window.open('/session/destroy', 'logout_aux', 'scrollbars=0, resizable=0, height=512, width=512');
  }

  var check_signed_in = function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        method: 'GET',
        url: 'session/current'
      }).done(function(response) {
        //console.log(response);
        remote_interface.update_friendly_name(response.friendly_name);
        resolve(response.signed_in);
      })
    })
    
  }

  var build_shared_profiles = function() {
    remote_interface.prebuild_shared_profiles();
    $.ajax({
      method: 'GET',
      url: '/profile/shared'
    }).done(function(response) {
      remote_interface.build_shared_profiles(response);
    })
  }

  // var do_handshake = function(provider, auth) {
  //   $.ajax({
  //     method: 'POST',
  //     url: '/handshake',
  //     csrf: get_csrf(),
  //     data: {
  //       provider: provider,
  //       expires_in: auth.expiresIn,
  //       uid: auth.userID
  //     }
  //   }).done(function(response) {
  //     console.log(response);
  //   })
  // }

  var get_csrf = function() {
    return $('meta[name="csrf-token"]').attr('content');
  }
  
  var get_status = function() {
    // FB.getLoginStatus(function(response) {
    //   console.log(response);

    //   switch (response.status) {
    //     case 'not_authorized':
    //     case 'unknown':
    //       show_login_button(true);
    //       show_connection_status(false);
    //       break;
    //     case 'connected':
    //       show_login_button(false);
    //       show_connection_status(true);
    //       break;
    //   }
    // });
    check_signed_in().then(function(is_connected) {
      if (is_connected) {
        show_login_button(false);
        show_connection_status(true);
      } else {
        show_login_button(true);
        show_connection_status(false);
      }
    })
  }

  var show_login_error_button = function() {
    $('#fblink-container').show();
    $('#link-to-fb-text').text('Retry?');
  }

  var show_login_button = function(val) {
    if (val) {
      $('#fblink-container').show();
      $('#link-to-fb-text').text('Sync?');
      $('#disconnect-fb-group').hide();
    } else {
      $('#fblink-container').hide();
      $('#disconnect-fb-group').show();
    }
  }

  var show_connection_status = function(val) {
    if (val) {
      $('#connection-status').text('Connected');
      is_connected = true;
    } else {
      $('#connection-status').text('Offline');
      profile_interface.remove_guest_profiles();
      is_connected = false;
    }
  }



  return {
    _simulate_download: _simulate_download,
    _simulate_login: _simulate_login,
    _simulate_logout: _simulate_logout,
    _simulate_upload: _simulate_upload,
    is_connected: function() { return is_connected; },
    build_shared_profiles: build_shared_profiles,
    check_signed_in: check_signed_in,
    get_csrf: get_csrf,
    get_status: get_status,
    show_login_button: show_login_button,
    show_connection_status: show_connection_status,
    
  }
}()