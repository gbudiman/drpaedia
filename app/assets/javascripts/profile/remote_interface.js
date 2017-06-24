var remote_interface = function() {
  var update_friendly_name = function(x) {
    $('#remote-friendly-name').editable('setValue', x);
  }

  return {
    update_friendly_name: update_friendly_name
  }
}()