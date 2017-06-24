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
        console.log(suggestion);
        var profile_name = get_profile_name($this);
        var guest_id = suggestion.id;

        console.log(profile_name);
        $.ajax({
          method: 'POST',
          url: '/profile/share',
          data: {
            profile_name: profile_name,
            guest_id: guest_id
          }
        }).done(function(response) {
          console.log(response)
          if (response.success) {
            $this.typeahead('val', '');
            mark_successfully_shared($this, response.id, suggestion.name);
          }
        })
      })
    });
  }

  var build_shared_profiles = function(data) {
    var master_record = ''
    $.each(data, function(profile, d) {
      var left_side = '<div class="col-xs-4">' + profile + '</div>';
      var right_side = '<div class="col-xs-8" data-profile-name="' + profile + '">';

      $.each(d, function(_junk, mcast) {
        right_side +=    '<div class="col-xs-12">'
                   +        mcast.guest_name
                   +        '<span class="pull-right glyphicon glyphicon-remove profile-unshare" '
                                + 'data-id="' + mcast.multicast_id + '">'
                   +        '</span>'
                   +     '</div>'
      })

      right_side +=      '<div class="col-xs-12">'
                 +          '<div class="col-xs-8 input-group input-group-sm share-cell">'
                 +            '<input tyle="text" class="form-control survivor-typeahead" />'
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

    console.log(cached);
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

  return {
    build_shared_profiles: build_shared_profiles,
    update_friendly_name: update_friendly_name
  }
}()