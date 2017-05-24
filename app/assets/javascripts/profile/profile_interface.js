var profile_interface = function() {
  var build = function() {
    attach();
    update_list();
  }

  var attach = function() {
    $('#profile-rename').editable({
      placement: 'bottom',
      unsavedclass: null,
      validate: validate_profile_name
    }).on('save', function(e, params) {
      profile.rename(params.newValue);
    })

    attach_copy_button();
    attach_copy_validation();
    attach_copy_close();
    attach_copy_execute();
    attach_scratch_button();
    

    $('#modal-copy').modal({
      show: false
    }).on('shown.bs.modal', function(e) {
      //$('#modal-copy-input').focus();
    });
  }

  var attach_copy_button = function() {
    $('#profile-copy').on('click', function(event) {
      $('#modal-copy').modal('show');
      event.preventDefault();
    })
  }

  var attach_scratch_button = function() {
    $('#profile-new').on('click', function(event) {
      var profiles = profile.get_all();
      var new_name = 'new';
      var counter = 0;
      var exist = profiles[new_name + counter.toString()] != undefined;

      while (exist) {
        counter++;
        exist = profiles[new_name + counter.toString()] != undefined;
      }

      var final_profile_name = new_name + counter.toString();

      profile.create_empty(final_profile_name);
      update_list();
      update_selected(final_profile_name);

      event.preventDefault();
    })
  }

  var update_list = function() {
    var anchor = $('#existing-profile');
    var master_data = profile.get_master();
    var current_selected = profile.get_current_name();
    var s = '';
    var active_class;

    anchor.nextAll().remove();

    $.each(master_data.profiles, function(x, _junk) {
      if (x == current_selected) {
        active_class = 'active';
      } else {
        active_class = '';
      }

      s += '<li class="' + active_class + '">'
         +   '<a href="#" data-name="' + x + '">'
         +     x
         +   '</a>'
         + '</li>';
    })

    $(s).insertAfter(anchor);
    attach_profile_load();
  }

  var attach_profile_load = function() {
    $('#profile-dropdown').find('[data-name]').each(function() {
      $(this).on('click', function(event) {
        var profile_name = $(this).attr('data-name');
        profile.switch_to(profile_name);
        update_list();
        update_selected(profile_name);
        return false;
      })
    })
  }

  var attach_copy_validation = function() {
    var enable_copy = function(allowed, message) {
      $('#modal-copy-execute').prop('disabled', !allowed)
      $('#modal-copy-error').text(message == null ? '' : message);
    }

    $('#modal-copy-input').on('keyup', function() {
      var new_value = $(this).val().trim();
      var validation = validate_profile_name(new_value);

      if (validation != null) {
        enable_copy(false, validation);
      } else {
        enable_copy(true, validation);
      }

    })
  }

  var attach_copy_close = function() {
    $('#modal-copy-cancel').on('click', function() {
      $('#modal-copy').modal('hide');
    })
  }

  var attach_copy_execute = function() {
    $('#modal-copy-execute').on('click', function() {
      var new_value = $('#modal-copy-input').val().trim();
      profile.copy_current_to(new_value);
      profile.switch_to(new_value);
      update_list();
      update_selected(new_value);
      $('#modal-copy').modal('hide');
    })
  }

  var update_selected = function(new_value) {
    $('#profile-rename').text(new_value);
  }

  var validate_profile_name = function(_new_value) {
    var current = profile.get_current_name();
    var new_value = _new_value.trim();

    if (new_value == '') {
      return 'Profile name can\'t be empty';
    } else if (profile.get_all()[new_value] != undefined) {
      if (new_value == current) return null;
      return 'Duplicate profile name';
    }

    return null;
  }

  return {
    build: build,
    update_selected: update_selected
  }
}()