var profession_conc_interface = (function() {
  var groups = {};

  var add = function(prof) {
    profession_conc.add(prof);

    var s = '<div class="purchased-conc">'
          +   '<span class="conc-prof-name">'
          +     prof 
          +   '</span>'
          +   '<span class="glyphicon glyphicon-remove pull-right remove-conc" data-conc="' + prof + '"></span>'
          + '</div>';

    $('#profession-conc-config').prepend(s);
    $('#profession-conc-config')
      .find('.remove-conc').off('click').on('click', function() {
        var target_prof = $(this).attr('data-conc');
        $(this).parent().remove();
        profession_conc.remove(target_prof);
      })
  }

  var attach_preq_check = function() {
    $('#add-prof-conc').on('click', function() {
      var config = stats_interface.get_config();
      var valids = profession_basic.get_valid_conc();

      $('#conc-profession-list').find('[data-conc]').each(function() {
        var invalid = validate($(this).attr('data-conc-class'), config, valids);

        if (Object.keys(invalid).length == 0) {
          $(this)
            .removeClass('conc-disabled')
            .find('a') 
              .css('color', '#333')
              .css('text-decoration', 'none')
              .attr('href', '#');
        } else {
          $(this)
            .addClass('conc-disabled')
            .find('a')
              .css('color', '#aaa')
              .css('text-decoration', 'line-through')
              .removeAttr('href');
        }
      })
    })
  }

  var validate = function(x, config, valids) {
    var invalids = {};
    // if (config.hp < 50 || config.mp < 50 || config.xp < 200) return false;
    // if (valids[x] == undefined) return false;
    // return true;
    if (config.hp < 50) invalids.hp = 'Must have HP >= 50';
    if (config.mp < 50) invalids.mp = 'Must have MP >= 50';
    if (config.xp < 200) invalids.xp = 'Must have acquired XP >= 200';
    if (valids[x] == undefined) invalids.prof = 'Must have basic profession that satisfies ' + x + ' role';

    return invalids;
  }

  var validate_existing = function() {
    if (!dynaloader.get_gil('ok_to_update_gui')) return;

    var config = stats_interface.get_config();
    var valids = profession_basic.get_valid_conc();
    var h = {};

    $.each(profession_conc.selected(), function(conc, _junk) {
      var group = groups[conc];
      var invalid = validate(group, config, valids);

      //notifier.conc_preq_missing(conc, invalid);
      h[conc] = invalid;
    });

    notifier.conc_preq_missing(h);
  }

  var build = function(d) {
    var raw = '';
    $.each(d, function(type, sd) {
      raw += '<li class="list-conc">' 
           +   type 
           +   label_conc(type)
           + '</li>';

      $.each(sd, function(_junk, pc) {
        raw += '<li class="list-conc" data-conc="' + pc + '" '
             +   'data-conc-class="' + conc_class(type) + '" '
             +   '>'
             +   '<a href="#">' + pc + '</a>'
             + '</li>';

        groups[pc] = conc_class(type);
      })
    })

    $('#conc-profession-list').append(raw);
    $('#conc-profession-list').find('li.list-conc').each(function() {
      $(this).on('click', function(event) {
        if ($(this).hasClass('conc-disabled')) return false;

        var that = $(this);
        var prof = that.text();

        add(prof);
        event.preventDefault();
      })
    })

    attach_preq_check();
  }

  var disable_limit_warning = function(x, overlimit) {
    if (x) {
      $('#conc-limit-warning').hide();
    } else {
      $('#conc-overlimit').text(overlimit);
      $('#conc-limit-warning').show();
    }
  }

  var conc_class = function(x) {
    switch(x) {
      case 'Combatant': return 'Combat';
      case 'Civilized Society': return 'Society';
      case 'Craft & Production': return 'Production'
    }
  }

  var label_conc = function(label) {

    var f;
    var badge_class;

    switch(label) {
      case 'Combatant':
      case 'Combat': f = 'C'; break;
      case 'Society':
      case 'Civilized Society': f = 'S'; break;
      case 'Production':
      case 'Craft & Production': f = 'P'; break;
      default: f = '';
    }

    switch(f) {
      case 'S': badge_class = 'progress-bar-warning'; break;
      case 'C': badge_class = 'progress-bar-danger'; break;
      case 'P': badge_class = 'progress-bar-info'; break;
      default: badge_class = '';
    }

    return '<span class="badge pc-badge ' + badge_class + ' pull-right">' + f + '</span>';
  }

  var reset = function() {
    profession_conc.reset();
    $('#profession-conc-config').find('.purchased-conc').remove();
    $('#conc-profession-list').find('a').removeClass('selected-profession');
  }

  var update_profession_added = function(x) {
    $('#conc-profession-list').find('li[data-conc="' + x + '"]').find('a')
      .addClass('selected-profession')
      .on('click', function(event) {
        return false;
      })
  }

  var update_profession_removed = function(x) {
    $('#conc-profession-list').find('li[data-conc="' + x + '"]').find('a')
      .removeClass('selected-profession')
      .off('click');
  }

  return {
    add: add,
    build: build,
    reset: reset,
    label_conc: label_conc,
    disable_limit_warning: disable_limit_warning,
    update_profession_added: update_profession_added,
    update_profession_removed: update_profession_removed,
    validate_existing: validate_existing
  }
})();