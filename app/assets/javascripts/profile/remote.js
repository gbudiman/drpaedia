var remote = function() {
  var get_status = function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
  return {
    get_status: get_status
  }
}()