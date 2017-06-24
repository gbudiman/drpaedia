var remote_interface = function() {
  var update_friendly_name = function(x) {
    $('#remote-friendly-name').editable('setValue', x);
  }

  var attach_typeahead = function() {
    var bloodhoundSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      identify: function(obj) { return obj.id },
      sufficient: 5,
      local: [],
      remote: {
        url: '/survivor/search?q=%QUERY',
        wildcard: '%QUERY'
      }
    })

    $('#sharing-settings').find('.survivor-typeahead').each(function() {
      var $this = $(this);
      $this.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      }, {
        name: 'suggestions',
        display: 'name',
        source: bloodhoundSuggestions
      }).on('typeahead:select', function(e, suggestion) {
        var $this = $(this);
        var profile_name = get_profile_name($this);
        var guest_id = suggestion.id;

        $.ajax({
          method: 'POST',
          url: '/profile/share',
          data: {
            profile_name: profile_name,
            guest_id: guest_id
          }
        }).done(function(response) {
          if (response.success == 'created') {
            $this.typeahead('val', '');
            mark_duplicate(null);
            mark_successfully_shared($this, response.id, suggestion.name);
          } else if (response.success == 'exist') {
            $this.typeahead('val', 'Already shared');
            $this.select();
            mark_duplicate(response.id);
          }
        })
      })
    });
  }

  var mark_duplicate = function(id) {
    $('#sharing-settings').find('.shared-duplicate').each(function() {
      $(this).removeClass('shared-duplicate');
    })

    if (id != null) {
      $('#sharing-settings').find('[data-id="' + id + '"]').parent().addClass('shared-duplicate');
    }
  }

  var build_shared_profiles = function(data) {
    var master_record = ''
    $.each(data, function(profile, d) {
      var left_side = '<div class="col-xs-4">' + profile + '</div>';
      var right_side = '<div class="col-xs-8 row" data-profile-name="' + profile + '">';

      $.each(d, function(_junk, mcast) {
        right_side +=    '<div class="col-xs-12">'
                   +        mcast.guest_name
                   +        '<span class="pull-right glyphicon glyphicon-remove profile-unshare" '
                                + 'data-id="' + mcast.multicast_id + '">'
                   +        '</span>'
                   +     '</div>'
      })

      right_side +=      '<div class="col-xs-12">'
                 +          '<div class="col-xs-12 input-group input-group-sm share-cell">'
                 +            '<input tyle="text" class="form-control survivor-typeahead" placeholder="Type some name" />'
                 +          '</div>'
                 +       '</div>';

      right_side +=    '</div>'

      master_record += left_side + right_side;
    })

    $('#sharing-settings').empty().append(master_record);
    attach_unshare();
    attach_typeahead();
  }

  var attach_unshare = function() {
    // $('#sharing-settings').find('.profile-unshare').each(function() {
    //   var $this = $(this);

    //   $this.show();
    //   $this.off('click').on('click', function() {
    //     unshare($this);
    //   })
    // })
    $('#sharing-settings').find('.profile-unshare').show().off('click').on('click', function() {
      unshare($(this));
    })
  }

  var get_profile_name = function(obj) {
    return obj.parent().parent().parent().parent().attr('data-profile-name');
  }

  var mark_successfully_shared = function(obj, id, guest_name) {
    var cached = obj.parent().parent().parent();

    var replacement = '<div class="col-xs-12">' 
                    +   guest_name
                    +   '<span class="pull-right glyphicon glyphicon-remove profile-unshare" '
                    +         'data-id="' + id + '">'
                    +   '</span>'
                    + '</div>';

    cached.before(replacement);

    cached.parent().find('.profile-unshare').show().off('click').on('click', function() {
      unshare($(this));
    });
  }

  var unshare = function(obj) {
    var id = obj.attr('data-id');

    $.ajax({
      method: 'POST',
      url: '/profile/unshare',
      data: {
        id: id
      }
    }).done(function() {
      obj.parent().remove();
    })
  }

  var update_sync_conflict = function(local, server, local_utime, server_utime) {
    var prepare = function(data, utime, most_recent) {
      var p_time = new Date(utime);
      var sorted_keys = Object.keys(data).sort();
      var t = 'Last update: ' + p_time + '<br />';
      
      if (most_recent) {
        t += '<span class="text-success"><strong>(most recent)</strong></span><br />';
      }

      $.each(sorted_keys, function(_junk, k) {
        d = data[k];
        t += '<hr><div class="row"><div class="col-xs-4">'
          +    k + '<br />'
          +    'XP: ' + d.xp
          +  '</div>'
          +  '<div class="col-xs-8">'
          +    d.strain + ' '
          +    Object.keys(d.professions).join(', ') + '<br />'
          +    'HP: +' + d.hp + ' MP: +' + d.mp + ' Inf: -' + d.inf + '<br />'
          +    'Acquired: ' + d.acq + ' | Planned: ' + d.plan
          +  '</div></div>';
      })

      return t;
    }

    var compare_equal = function(a, b) {
      var is_equal = true;

      if (Object.keys(a).length != Object.keys(b).length) return false;
      $.each(a, function(name, _junk) {
        if (b[name] == undefined) {
          is_equal = false;
          return false;
        }
      })

      if (is_equal == false) return false;

      $.each(b, function(name, _junk) {
        if (a[name] == undefined) {
          is_equal = false;
          return false;
        }
      })

      if (is_equal == false) return false;
      // At this point, we know each stream contains identical profiles

      var granular_compare = function(xa, xb, prop) {
        return xa[prop] == xb[prop];
      }

      $.each(a, function(name, _data) {
        var cmp_a = a[name];
        var cmp_b = b[name];

        $.each(['xp', 'hp', 'mp', 'inf', 'acq', 'plan'], function(_junk, prop) {
          is_equal &= granular_compare(cmp_a, cmp_b, prop);
        })

        if (is_equal == false) return false;
      })

      if (is_equal == false) return false;

      return true;
    }

    console.log(local);
    if (local_utime != server_utime) {
      if (compare_equal(local, server) == false) {
        $('#conflict-sync-local-data').empty().append(prepare(local, local_utime, local_utime > server_utime));
        $('#conflict-sync-server-data').empty().append(prepare(server, server_utime, server_utime > local_utime));
        $('#modal-sync-conflict').modal('show');
      }
    }
  }

  return {
    build_shared_profiles: build_shared_profiles,
    update_friendly_name: update_friendly_name,
    update_sync_conflict: update_sync_conflict
  }
}()