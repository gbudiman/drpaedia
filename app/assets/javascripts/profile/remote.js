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
        console.log(response.signed_in);
        resolve(response.signed_in);
      })
    })
    
  }

  var do_handshake = function(provider, auth) {
    $.ajax({
      method: 'POST',
      url: '/handshake',
      csrf: get_csrf(),
      data: {
        provider: provider,
        expires_in: auth.expiresIn,
        uid: auth.userID
      }
    }).done(function(response) {
      console.log(response);
    })
  }

  var get_csrf = function() {
    return $('meta[name="csrf-token"]').attr('content');
  }
  
  var get_status = function() {
    FB.getLoginStatus(function(response) {
      console.log(response);

      switch (response.status) {
        case 'not_authorized':
        case 'unknown':
          show_login_button(true);
          show_connection_status(false);
          break;
        case 'connected':
          show_login_button(false);
          show_connection_status(true);
          break;
      }
      //statusChangeCallback(response);
    });
  }

  var show_login_error_button = function() {
    $('#fblink-container').show();
    $('#link-to-fb-text').text('Retry?');
  }

  var show_login_button = function(val) {
    if (val) {
      $('#fblink-container').show();
      $('#link-to-fb-text').text('Sync?');
    } else {
      $('#fblink-container').hide();
    }
  }

  var show_connection_status = function(val) {
    if (val) {
      $('#connection-status').show();
    } else {
      $('#connection-status').hide();
    }
  }

  return {
    _simulate_login: _simulate_login,
    _simulate_logout: _simulate_logout,
    _simulate_upload: _simulate_upload,
    check_signed_in: check_signed_in,
    do_handshake: do_handshake,
    get_csrf: get_csrf,
    get_status: get_status,
    show_login_button: show_login_button,
    show_connection_status: show_connection_status
  }
}()