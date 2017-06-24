var remote = function() {
  var _simulate_login = function() {
    // FB.login(function(response) {
    //   if (response.status == 'connected') {
    //     //window.open('/auth/facebook/callback', 'login_aux', 'scrollbars=0, resizable=0, height=256, width=384');
    //   }
    //   //do_handshake('facebook', response.authResponse);
    // }, {scope: 'email'})
    window.open('/survivors/auth/facebook', 'login_aux', 'scrollbars=0, resizable=0, height=256, width=384');
  }

  var _simulate_upload = function() {
    $.ajax({
      method: 'POST',
      url: '/sync/upstream',
      csrf: get_csrf(),
      data: {
        profile_data: JSON.stringify(profile.get_root())
      }
    }).done(function(response) {
      if (response.response == 'synchronized') {
        console.log('Upstream syncrhonized');
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
      console.log(response);
    })
  }

  var _simulate_logout = function() {
    window.open('/session/destroy', 'logout_aux', 'scrollbars=0, resizable=0, height=256, width=384');
  }

  var check_signed_in = function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        method: 'GET',
        url: 'session/current'
      }).done(function(response) {
        console.log(response);
        remote_interface.update_friendly_name(response.friendly_name);
        resolve(response.signed_in);
      })
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
    } else {
      $('#connection-status').text('Offline');
    }
  }

  return {
    _simulate_download: _simulate_download,
    _simulate_login: _simulate_login,
    _simulate_logout: _simulate_logout,
    _simulate_upload: _simulate_upload,
    check_signed_in: check_signed_in,
    get_csrf: get_csrf,
    get_status: get_status,
    show_login_button: show_login_button,
    show_connection_status: show_connection_status
  }
}()