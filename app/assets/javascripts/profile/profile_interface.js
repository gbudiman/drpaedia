var profile_interface = function() {
  var editable_has_been_setup = false;

  var build = function() {
    attach();
    update_list();
  }

  var attach = function() {
    $('#profile-rename').editable({
      placement: 'bottom',
      unsavedclass: null,
      validate: validate_profile_name,
      container: 'body',
      
    }).on('save', function(e, params) {
      var new_value = params.newValue.trim();
      profile.rename(new_value);
      update_list();
      setTimeout(function() {
        update_selected(new_value);
      }, 50);
    }).on('shown', function(e, params) {
      var that = $(this);
      var input = $('.editable-popup').find('input');
      input.val(that.text());
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

    editable_has_been_setup = true;
  }

  var attach_copy_button = function() {
    $('#profile-copy').on('click', function(event) {
      $('#modal-copy').modal('show');
      event.preventDefault();
    })
  }

  var attach_scratch_button = function() {
    $('#profile-new').on('click', function(event) {
      var profiles = Object.assign({}, profile.get_all(), profile.get_deleted());

      var new_name = 'new';
      var counter = 0;
      var exist = profiles[new_name + counter.toString()] != undefined;

      //console.log(profiles);
      while (exist) {
        counter++;
        exist = profiles[new_name + counter.toString()] != undefined;
      }

      var final_profile_name = new_name + counter.toString();

      profile.create_empty(final_profile_name);
      event.preventDefault();
    })
  }

  var update_list = function() {
    var anchor = $('#existing-profile');
    var master_data = profile.get_all();
    var deleted_profiles = profile.get_deleted();
    var current_selected = profile.get_current_name();
    var primary = profile.get_primary();
    var s = '';
    var active_class;
    var more_than_one_profile = Object.keys(master_data).length > 1;

    var set_primary_option = function(x, primary) {
      var is_primary = x == primary;

      return '<span class="glyphicon set-primary glyphicon-' 
           + (is_primary ? 'star' : 'star-empty') 
           + '" data-set-primary="' + x + '"></span>';
    }

    var can_delete = function(x) {
      if (more_than_one_profile) return true;
      if (x == 'default') return false;
    }

    anchor.nextAll().remove();

    $.each(master_data, function(x, _junk) {
      if (deleted_profiles[x] != undefined) return true;

      if (x == current_selected) {
        active_class = 'anchor-active';
      } else {
        active_class = '';
      }

      s += '<li class="profile-block">'
         +   set_primary_option(x, primary)
         +   '<span><a href="#" data-name="' + x + '" class="' + active_class + '">'
         +     x
         +   '</a></span>'
         +   (can_delete
               ? '<span class="glyphicon glyphicon-remove pull-right text-danger profile-delete" data-deleted=false></span>'
               : '')
         + '</li>';
    })

    $.each(deleted_profiles, function(x, _junk) {
      s += '<li class="profile-block">'
         +   '<span><a href="#" data-name="' + x + '" class="profile-deleted">'
         +     x
         +   '</a></span>'
         +   '<span class="glyphicon glyphicon-repeat pull-right profile-delete" data-deleted=true></span>'
         + '</li>';
    })

    $(s).insertAfter(anchor);
    attach_profile_load();
    attach_profile_set_primary();
    configbar.fetch_guest_profiles();
  }

  var attach_profile_set_primary = function() {
    $('#profile-dropdown').find('[data-set-primary]').each(function() {
      $(this).on('click', function(event) {
        profile.set_primary($(this).attr('data-set-primary'));
        update_list();
        return false;
      })
    })
  }

  var attach_profile_load = function() {
    $('#profile-dropdown').find('[data-name]').each(function() {
      $(this).on('mouseover', function(event) {
        if ($(this).hasClass('profile-deleted')) {
          return false;
        }
      });

      $(this).on('click', function(event) {
        if ($(this).hasClass('anchor-active') || $(this).hasClass('profile-deleted')) {
          return false;
        }

        var profile_name = $(this).attr('data-name');

        $('#skill-pool').animate({
          opacity: 0.5
        }, 50, function() {
          profile.switch_to(profile_name);
          update_list();
          update_selected(profile_name);
        })
        
        return false;
      })

      $(this).parent().parent().find('.profile-delete').on('click', function(event) {
        var is_deleted = !($(this).attr('data-deleted') == 'true' ? true : false);
        var text = $(this).parent().find('[data-name]');
        var profile_name = text.attr('data-name');

        if (is_deleted) {
          text.addClass('profile-deleted');
          $(this)
            .removeClass('glyphicon-remove')
            .addClass('glyphicon-repeat')
            .removeClass('text-danger');

          profile.soft_delete(profile_name);
          update_list();
          text.removeAttr('href');
        } else {
          text.removeClass('profile-deleted');
          $(this)
            .addClass('glyphicon-remove')
            .removeClass('glyphicon-repeat')
            .addClass('text-danger');

          profile.undelete(profile_name);
          text.attr('href', '#');
          update_list();
        }

        $(this).attr('data-deleted', is_deleted);
        text.removeClass('anchor-active');
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

  var unanchor_profiles = function() {
    $('#profile-dropdown').find('.anchor-active').each(function() {
      $(this).removeClass('anchor-active');
    })
  }

  var remove_guest_profiles = function() {
    $('#guest-profile-separator').remove();
    $('#profile-dropdown').find('.guest-profile').remove();
  }

  var preappend_guest_profiles = function() {
    $('#guest-profile-separator').remove();
    $('#profile-dropdown').append('<li role="separator" class="divider" id="guest-profile-separator"></li>');
    $('#profile-dropdown').find('.guest-profile').remove();
    $('#profile-dropdown')
      .append('<li class="guest-profile">'
            +   '<span><a>Fetching data...</a></span>'
            + '</li>');
  }

  var append_guest_profiles = function(data) {
    var activate = function() {
      $('#profile-dropdown').find('.guest-profile-clickable').off('click').on('click', function() {
        var id = $(this).attr('data-id');
        var name = $(this).text();

        $('#skill-pool').animate({
          opacity: 0.5
        }, 50);

        $.ajax({
          method: 'GET',
          url: '/profile/fetch',
          data: {
            id: id
          }
        }).done(function(response) {
          profile.inject(response.data);
          profile.switch_to(name, true);
          unanchor_profiles();
        })

        return false;
      })
    }

    $('#guest-profile-separator').remove();
    if (Object.keys(data).length > 0) {
      $('#profile-dropdown').append('<li role="separator" class="divider" id="guest-profile-separator"></li>');
    }

    $('#profile-dropdown').find('.guest-profile').remove();

    var raw = '';
    $.each(data, function(id, name) {
      raw += '<li class="guest-profile">'
          +    '<span>'
          +      '<a href="#" class="guest-profile-clickable" data-id="' + id + '">'
          +        name
          +      '</a>'
          +    '</span>'
          +  '</li>';
    })

    $('#profile-dropdown').append(raw);
    activate();
  }

  var update_selected = function(new_value, _is_read_only) {
    var is_read_only = _is_read_only == undefined ? false : _is_read_only;

    if (is_read_only) {
      $('#profile-rename').html(new_value);
      if (editable_has_been_setup) {
        $('#profile-rename').editable('disable');
      }
    } else {
      $('#profile-rename').html('<span class="glyphicon glyphicon-pencil"></span>&nbsp; ' + new_value);
      if (editable_has_been_setup) {
        $('#profile-rename').editable('enable');
      }
    }
    $('#config-button').find('.profile-name').text(new_value);
    configbar.initialize_arrow();
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
    preappend_guest_profiles: preappend_guest_profiles,
    append_guest_profiles: append_guest_profiles,
    remove_guest_profiles: remove_guest_profiles,
    update_list: update_list,
    update_selected: update_selected,
  }
}()